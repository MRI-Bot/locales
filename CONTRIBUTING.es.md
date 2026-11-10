[Português](CONTRIBUTING.md) · [English](CONTRIBUTING.en.md) · **Español**

# Cómo contribuir con traducciones

## Qué puedes editar

- **Sí:** los archivos dentro de `en/`, `es/` (y de un idioma nuevo, si se acordó antes en un issue).
- **No:** `pt-BR/` (es el texto original y viene del código del bot), `.github/` y `languages.json`.
  El CI rechaza los PR que modifiquen esos archivos.

¿Encontraste un error en el texto en portugués? Abre un issue.

## Formato

Cada archivo es un JSON con texto u objetos anidados. Las claves son las mismas del archivo
correspondiente en `pt-BR/`:

```json
// pt-BR/bot-tickets.json
{ "close": { "title": "Fechar ticket", "by": "Fechado por {user}" } }

// es/bot-tickets.json
{ "close": { "title": "Cerrar ticket", "by": "Cerrado por {user}" } }
```

Una clave que no tradujiste puede quedar fuera del archivo: el bot muestra el texto en portugués en
su lugar. No inventes claves que no existan en `pt-BR/`.

## Placeholders y plural (ICU)

- `{user}`, `{count}`, `{guild}`… los completa el bot. **Mantén exactamente los mismos** de la
  versión en pt-BR: no traduzcas su nombre, no los quites ni agregues otros. Puedes cambiarlos de
  lugar en la frase.
- Plural: `{n, plural, one {# ticket} other {# tickets}}`. El `#` se convierte en el número.
  Mantén `{n, plural, ...}` y traduce solo el texto dentro de las opciones. `other` es obligatorio;
  usa las categorías de tu idioma (`one`, `other`; `=0` para un texto especial en cero).
- Elección por valor: `{status, select, open {Abierto} closed {Cerrado} other {…}}` — traduce solo
  el texto, nunca `open`/`closed`.
- Para escribir `{` o `}` literalmente en el texto, usa apóstrofo: `'{'`.

## Términos

Sigue el [GLOSSARY.es.md](GLOSSARY.es.md). Allí está lo que **no** se traduce (nombres de producto,
términos de Discord) y los términos fijos de cada idioma, para que el bot no llame a lo mismo de
dos formas.

## Probar antes de abrir el PR

Solo necesitas Node.js (18 o más reciente):

```bash
node .github/scripts/validate.mjs .
```

Señala JSON roto, placeholders distintos de los del pt-BR, plurales sin `other` y claves que no
existen en pt-BR, y muestra cuánto de cada idioma ya está traducido. La misma prueba corre en el PR.

## Licencia

Las traducciones de este repositorio se publican bajo [CC BY 4.0](LICENSE). Al abrir un pull
request, aceptas licenciar tu contribución en los mismos términos.

## Revisión

Alguien del equipo revisa y hace el merge. La traducción aprobada entra en la próxima versión del bot.
