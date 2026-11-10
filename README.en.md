[Português](README.md) · **English** · [Español](README.es.md)

# MRI Bot — translations

This repository holds **only the texts** of [MRI Bot](https://bot.mriqbox.com.br): the dashboard,
the bot's messages on Discord, slash command names and the FiveM/MTA resources. No bot code lives
here. Anyone can fix or complete a translation by opening a pull request.

## How it is organized

```
pt-BR/   original text (comes from the bot's code; no PRs accepted)
en/      English
es/      Spanish
languages.json   languages and the Discord locales mapped to each one
GLOSSARY.en.md   terms that are not translated and fixed terms
```

Each folder has one file per area, with the same name in all three languages. The prefix tells you
where the text shows up:

| Prefix | Where it shows up |
|---|---|
| `panel-*.json` | web dashboard (bot.mriqbox.com.br) and public store |
| `api.json` | error messages (dashboard and bot) |
| `bot-*.json` | what the bot writes on Discord |
| `bot-commands.json` | slash command names and descriptions (Discord rule: lowercase, no spaces, up to 32 characters) |
| `srv-*.json` | messages the server sends to Discord, emails and generated files |
| `pkg-*.json` | module texts (Discord Admin, Community, tickets, giveaways, whitelist) |

Keys are the same in every language.

## Contributing

Read [CONTRIBUTING.en.md](CONTRIBUTING.en.md). In short: edit your language's file, keep the
`{placeholders}` the same as in pt-BR and run `node .github/scripts/validate.mjs .` before opening
the PR.

## When a translation reaches the bot

Approved translations ship in the bot's next release. Text that hasn't been translated yet shows
in Portuguese.

## License

[CC BY 4.0](LICENSE) — you may use and adapt it, with attribution.
