**Português** · [English](README.en.md) · [Español](README.es.md)

# MRI Bot — traduções

Este repositório guarda **só os textos** do [MRI Bot](https://bot.mriqbox.com.br): painel, mensagens
do bot no Discord, nomes dos comandos de barra e os resources de FiveM/MTA. Não tem código do bot.
Qualquer pessoa pode corrigir ou completar uma tradução abrindo um pull request.

## Como está organizado

```
pt-BR/   texto original (vem do código do bot; não aceita PR)
en/      inglês
es/      espanhol
languages.json   idiomas e os locales do Discord de cada um
GLOSSARY.md      termos que não se traduzem e termos fixos
```

Cada pasta tem um arquivo por área, com o mesmo nome nos três idiomas. O prefixo diz onde o texto aparece:

| Prefixo | Onde aparece |
|---|---|
| `panel-*.json` | painel web (bot.mriqbox.com.br) e loja pública |
| `api.json` | mensagens de erro (painel e bot) |
| `bot-*.json` | o que o bot escreve no Discord |
| `bot-commands.json` | nome e descrição dos comandos de barra (regra do Discord: minúsculas, sem espaço, até 32 caracteres) |
| `srv-*.json` | mensagens que o servidor manda pro Discord, e-mails e arquivos gerados |
| `pkg-*.json` | textos dos módulos (Discord Admin, Comunidade, tickets, sorteios, whitelist) |

As chaves são as mesmas em todos os idiomas.

## Contribuir

Leia o [CONTRIBUTING.md](CONTRIBUTING.md). Em resumo: edite o arquivo do seu idioma, mantenha os
`{placeholders}` iguais aos do pt-BR e rode `node .github/scripts/validate.mjs .` antes de abrir o PR.

## Quando a tradução chega no bot

As traduções aprovadas entram no próximo release do bot. Texto que ainda não foi traduzido aparece
em português.

## Licença

[CC BY 4.0](LICENSE) — pode usar e adaptar, citando a fonte.
