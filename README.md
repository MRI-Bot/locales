# MRI Bot — traduções / translations / traducciones

Este repositório guarda **só os textos** do [MRI Bot](https://bot.mriqbox.com.br): painel, mensagens
do bot no Discord, nomes dos comandos de barra e os resources de FiveM/MTA. Não tem código do bot.
Qualquer pessoa pode corrigir ou completar uma tradução abrindo um pull request.

This repository holds **only the texts** of MRI Bot. No bot code lives here. Anyone can fix or
complete a translation by opening a pull request. / Este repositorio contiene **solo los textos**
de MRI Bot; cualquiera puede corregir o completar una traducción con un pull request.

## Como está organizado

```
pt-BR/   texto original (vem do código do bot; não aceita PR)
en/      inglês
es/      espanhol
languages.json   idiomas e os locales do Discord de cada um
GLOSSARY.md      termos que não se traduzem e termos fixos
```

Cada pasta tem um arquivo por parte do bot (`panel.json`, `bot.json`, `commands.json`,
`tickets.json`, …). As chaves são as mesmas em todos os idiomas.

## Contribuir

Leia o [CONTRIBUTING.md](CONTRIBUTING.md). Em resumo: edite o arquivo do seu idioma, mantenha os
`{placeholders}` iguais aos do pt-BR e rode `node .github/scripts/validate.mjs .` antes de abrir o PR.

## Quando a tradução chega no bot

As traduções aprovadas entram no próximo release do bot. Texto que ainda não foi traduzido aparece
em português.

## Licença

[CC BY 4.0](LICENSE) — pode usar e adaptar, citando a fonte.
