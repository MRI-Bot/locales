#!/usr/bin/env node
// GERADO por `mri-i18n emit-validator` (pacote privado @mri-bot/i18n).
// NÃO edite aqui: a regra muda no pacote e esta cópia é sobrescrita pelo sync.
// Validador das traduções do MRI Bot (docs/i18n-module.md §4.2).
//
// Fonte única: este arquivo vive no pacote privado @mri-bot/i18n e é COPIADO pro
// repo público MRI-Bot/locales por `mri-i18n emit-validator`. Só usa o node
// (sem npm install, sem secret), pra rodar até em PR de fork.
//
// Uso: node validate.mjs <pasta-com-pt-BR-en-es> [--summary arquivo.md]
//
// Regras:
//  - JSON válido e mensagens ICU que fecham as chaves;
//  - a tradução usa EXATAMENTE os mesmos placeholders do pt-BR;
//  - nenhuma chave que não exista no pt-BR (texto que saiu);
//  - chave faltando NÃO reprova: entra como cobertura parcial no resumo.
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

export const SOURCE_LOCALE = 'pt-BR';

/** Achata `{ a: { b: "x" } }` em `{ "a.b": "x" }`. Valor que não é texto vira erro. */
export function flatten(tree, prefix = '', out = {}, errors = []) {
  for (const [k, v] of Object.entries(tree ?? {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out, errors);
    else errors.push(`${key}: valor tem que ser texto ou objeto`);
  }
  return { messages: out, errors };
}

/**
 * Lê os argumentos de uma mensagem ICU (`{nome}`, `{n, plural, ...}`,
 * `{x, select, ...}`), entrando nos ramos de plural/select. Lança se as chaves
 * não fecham. Respeita o escape com apóstrofo do ICU (`'{'` é literal).
 */
export function icuArgs(message) {
  const args = new Set();
  let i = 0;
  const s = message;

  function readText(stopAtClose) {
    while (i < s.length) {
      const c = s[i];
      if (c === "'") {
        if (s[i + 1] === "'") { i += 2; continue; }
        if (s[i + 1] === '{' || s[i + 1] === '}' || s[i + 1] === '#') {
          const end = s.indexOf("'", i + 1);
          if (end < 0) throw new Error('apóstrofo de escape sem fechar');
          i = end + 1;
          continue;
        }
        i++;
        continue;
      }
      if (c === '{') { i++; readArg(); continue; }
      if (c === '}') {
        if (stopAtClose) return;
        throw new Error(`"}" sobrando na posição ${i}`);
      }
      i++;
    }
    if (stopAtClose) throw new Error('"{" sem fechar');
  }

  function skipSpaces() { while (i < s.length && /\s/.test(s[i])) i++; }

  function readArg() {
    skipSpaces();
    if (i >= s.length) throw new Error('"{" sem fechar');
    const start = i;
    while (i < s.length && /[\p{L}\p{N}_-]/u.test(s[i])) i++;
    const name = s.slice(start, i);
    if (!name) throw new Error(`placeholder sem nome na posição ${start}`);
    args.add(name);
    skipSpaces();
    if (s[i] === '}') { i++; return; }
    if (s[i] !== ',') throw new Error(`placeholder {${name}} malformado`);
    i++;
    skipSpaces();
    const tStart = i;
    while (i < s.length && /[a-z]/i.test(s[i])) i++;
    const type = s.slice(tStart, i);
    skipSpaces();
    if (type === 'plural' || type === 'select' || type === 'selectordinal') {
      if (s[i] !== ',') throw new Error(`{${name}, ${type}} sem opções`);
      i++;
      let options = 0;
      for (;;) {
        skipSpaces();
        if (s[i] === '}') { i++; break; }
        const sel = i;
        while (i < s.length && !/[\s{}]/.test(s[i])) i++;
        if (i === sel) throw new Error(`opção vazia em {${name}, ${type}}`);
        skipSpaces();
        if (s[i] !== '{') throw new Error(`opção sem mensagem em {${name}, ${type}}`);
        i++;
        readText(true);
        i++;
        options++;
      }
      if (options === 0) throw new Error(`{${name}, ${type}} sem opções`);
      if (type !== 'select' && !/\bother\s*\{/.test(message)) throw new Error(`{${name}, ${type}} sem a opção "other"`);
      return;
    }
    // number/date/time com estilo: pula até o "}" que fecha.
    let depth = 1;
    while (i < s.length && depth > 0) {
      if (s[i] === '{') depth++;
      else if (s[i] === '}') depth--;
      i++;
    }
    if (depth !== 0) throw new Error(`{${name}, ${type}} sem fechar`);
  }

  readText(false);
  return args;
}

function readLocaleDir(dir) {
  const files = {};
  const errors = [];
  if (!existsSync(dir)) return { files, errors };
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.json')).sort()) {
    const ns = basename(f, '.json');
    try {
      const json = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      const { messages, errors: e } = flatten(json);
      files[ns] = messages;
      errors.push(...e.map((m) => `${f}: ${m}`));
    } catch (err) {
      errors.push(`${f}: JSON inválido (${err.message})`);
    }
  }
  return { files, errors };
}

const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

/** Valida a pasta raiz. Devolve erros (reprovam) e a cobertura por idioma. */
export function validateRoot(root) {
  const errors = [];
  const coverage = {};
  const src = readLocaleDir(join(root, SOURCE_LOCALE));
  errors.push(...src.errors.map((e) => `${SOURCE_LOCALE}/${e}`));
  const srcArgs = {};
  for (const [ns, msgs] of Object.entries(src.files)) {
    for (const [key, text] of Object.entries(msgs)) {
      try {
        srcArgs[`${ns}:${key}`] = icuArgs(text);
      } catch (err) {
        errors.push(`${SOURCE_LOCALE}/${ns}.json ${key}: ${err.message}`);
      }
    }
  }
  const total = Object.keys(srcArgs).length;

  const locales = existsSync(root)
    ? readdirSync(root).filter((d) => d !== SOURCE_LOCALE && !d.startsWith('.') && statSync(join(root, d)).isDirectory() && /^[a-z]{2}(-[A-Z]{2}|-\d{3})?$/.test(d))
    : [];
  for (const loc of locales.sort()) {
    const tr = readLocaleDir(join(root, loc));
    errors.push(...tr.errors.map((e) => `${loc}/${e}`));
    let translated = 0;
    for (const [ns, msgs] of Object.entries(tr.files)) {
      if (!src.files[ns]) {
        errors.push(`${loc}/${ns}.json: arquivo não existe em ${SOURCE_LOCALE}`);
        continue;
      }
      for (const [key, text] of Object.entries(msgs)) {
        const id = `${ns}:${key}`;
        if (!(id in srcArgs)) {
          if (!(key in src.files[ns])) errors.push(`${loc}/${ns}.json ${key}: chave não existe em ${SOURCE_LOCALE} (texto removido?)`);
          continue;
        }
        let args;
        try {
          args = icuArgs(text);
        } catch (err) {
          errors.push(`${loc}/${ns}.json ${key}: ${err.message}`);
          continue;
        }
        if (!sameSet(args, srcArgs[id])) {
          const want = [...srcArgs[id]].map((a) => `{${a}}`).join(' ') || '(nenhum)';
          const got = [...args].map((a) => `{${a}}`).join(' ') || '(nenhum)';
          errors.push(`${loc}/${ns}.json ${key}: placeholders ${got}, o ${SOURCE_LOCALE} usa ${want}`);
          continue;
        }
        if (text.trim()) translated++;
      }
    }
    coverage[loc] = { translated, total };
  }
  return { errors, coverage, total };
}

export function summaryMarkdown({ errors, coverage, total }) {
  const lines = ['## Validação das traduções', ''];
  lines.push(errors.length ? `❌ ${errors.length} problema(s):` : '✅ Nenhum problema.');
  for (const e of errors.slice(0, 200)) lines.push(`- \`${e}\``);
  if (errors.length > 200) lines.push(`- … e mais ${errors.length - 200}`);
  lines.push('', `| Idioma | Traduzidas | Cobertura |`, '|---|---|---|');
  for (const [loc, c] of Object.entries(coverage)) {
    const pct = total ? Math.floor((c.translated / total) * 100) : 100;
    lines.push(`| ${loc} | ${c.translated}/${total} | ${pct}% |`);
  }
  return lines.join('\n') + '\n';
}

function main(argv) {
  const root = argv.find((a) => !a.startsWith('--')) ?? '.';
  const sIdx = argv.indexOf('--summary');
  const result = validateRoot(root);
  const md = summaryMarkdown(result);
  if (sIdx >= 0 && argv[sIdx + 1]) writeFileSync(argv[sIdx + 1], md, { flag: 'a' });
  process.stdout.write(md);
  process.exit(result.errors.length ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
