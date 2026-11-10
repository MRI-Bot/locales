# Como contribuir com traduções

## O que você pode editar

- **Sim:** os arquivos dentro de `en/`, `es/` (e de um idioma novo, se combinado numa issue antes).
- **Não:** `pt-BR/` (é o texto original e vem do código do bot), `.github/` e `languages.json`.
  PR que mexer nesses arquivos é recusado pelo CI.

Achou um erro no texto em português? Abra uma issue.

## Formato

Cada arquivo é um JSON com texto ou objetos aninhados. A chave é igual à do `pt-BR/` do mesmo arquivo:

```json
// pt-BR/tickets.json
{ "close": { "title": "Fechar ticket", "by": "Fechado por {user}" } }

// en/tickets.json
{ "close": { "title": "Close ticket", "by": "Closed by {user}" } }
```

Chave que você não traduziu pode simplesmente ficar de fora do arquivo: o bot mostra o texto em
português no lugar. Não invente chaves que não existem no `pt-BR/`.

## Placeholders e plural (ICU)

- `{user}`, `{count}`, `{guild}`… são preenchidos pelo bot. **Mantenha exatamente os mesmos** da
  versão em pt-BR — nem traduzir o nome, nem tirar, nem acrescentar. Pode mudar a posição na frase.
- Plural: `{n, plural, one {# ticket} other {# tickets}}`. O `#` vira o número. Mantenha o
  `{n, plural, ...}` e traduza só o texto de dentro das opções. `other` é obrigatório; use as
  categorias do seu idioma (`one`, `other`; `=0` pra um texto especial no zero).
- Escolha por valor: `{status, select, open {Aberto} closed {Fechado} other {…}}` — traduza só o
  texto, nunca `open`/`closed`.
- Pra escrever `{` ou `}` de verdade no texto, use apóstrofo: `'{'`.

## Termos

Siga o [GLOSSARY.md](GLOSSARY.md). Ele lista o que **não** se traduz (nome de produto, termos do
Discord) e os termos fixos de cada idioma, pra o bot não chamar a mesma coisa de dois nomes.

## Testar antes de abrir o PR

Precisa só do Node.js (18 ou mais novo):

```bash
node .github/scripts/validate.mjs .
```

Ele aponta JSON quebrado, placeholder diferente do pt-BR, plural sem `other` e chave que não
existe no pt-BR, e mostra quanto de cada idioma já está traduzido. O mesmo teste roda no PR.

## Licença

As traduções deste repositório são licenciadas sob [CC BY 4.0](LICENSE). Ao abrir um pull request,
você concorda em licenciar a sua contribuição nos mesmos termos.

## Revisão

Alguém da equipe revisa e faz o merge. Tradução aprovada entra no próximo release do bot.
