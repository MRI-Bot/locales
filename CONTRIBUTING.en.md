[Português](CONTRIBUTING.md) · **English** · [Español](CONTRIBUTING.es.md)

# How to contribute translations

## What you can edit

- **Yes:** the files inside `en/`, `es/` (and a new language's folder, if agreed in an issue first).
- **No:** `pt-BR/` (it's the original text and comes from the bot's code), `.github/` and
  `languages.json`. CI rejects PRs that touch these files.

Found a mistake in the Portuguese text? Open an issue.

## Format

Each file is JSON with text or nested objects. The keys match the same file in `pt-BR/`:

```json
// pt-BR/bot-tickets.json
{ "close": { "title": "Fechar ticket", "by": "Fechado por {user}" } }

// en/bot-tickets.json
{ "close": { "title": "Close ticket", "by": "Closed by {user}" } }
```

A key you haven't translated can simply be left out of the file: the bot shows the Portuguese text
instead. Don't add keys that don't exist in `pt-BR/`.

## Placeholders and plurals (ICU)

- `{user}`, `{count}`, `{guild}`… are filled in by the bot. **Keep exactly the same ones** as the
  pt-BR version — don't translate their names, remove them or add new ones. You may move them
  within the sentence.
- Plural: `{n, plural, one {# ticket} other {# tickets}}`. The `#` becomes the number. Keep the
  `{n, plural, ...}` part and translate only the text inside the options. `other` is required; use
  your language's categories (`one`, `other`; `=0` for a special text at zero).
- Choice by value: `{status, select, open {Open} closed {Closed} other {…}}` — translate only the
  text, never `open`/`closed`.
- To write a literal `{` or `}` in the text, use an apostrophe: `'{'`.

## Terms

Follow [GLOSSARY.en.md](GLOSSARY.en.md). It lists what is **not** translated (product names,
Discord terms) and the fixed terms for each language, so the bot doesn't call the same thing by two
names.

## Test before opening the PR

You only need Node.js (18 or newer):

```bash
node .github/scripts/validate.mjs .
```

It points out broken JSON, placeholders that differ from pt-BR, plurals without `other` and keys
that don't exist in pt-BR, and shows how much of each language is translated. The same check runs
on the PR.

## License

The translations in this repository are licensed under [CC BY 4.0](LICENSE). By opening a pull
request, you agree to license your contribution under the same terms.

## Review

Someone from the team reviews and merges. Approved translations ship in the bot's next release.
