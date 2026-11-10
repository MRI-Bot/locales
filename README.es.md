[Português](README.md) · [English](README.en.md) · **Español**

# MRI Bot — traducciones

Este repositorio contiene **solo los textos** de [MRI Bot](https://bot.mriqbox.com.br): el panel,
los mensajes del bot en Discord, los nombres de los comandos de barra y los resources de FiveM/MTA.
No hay código del bot. Cualquiera puede corregir o completar una traducción abriendo un pull request.

## Cómo está organizado

```
pt-BR/   texto original (viene del código del bot; no acepta PR)
en/      inglés
es/      español
languages.json   idiomas y los locales de Discord de cada uno
GLOSSARY.es.md   términos que no se traducen y términos fijos
```

Cada carpeta tiene un archivo por área, con el mismo nombre en los tres idiomas. El prefijo indica
dónde aparece el texto:

| Prefijo | Dónde aparece |
|---|---|
| `panel-*.json` | panel web (bot.mriqbox.com.br) y tienda pública |
| `api.json` | mensajes de error (panel y bot) |
| `bot-*.json` | lo que el bot escribe en Discord |
| `bot-commands.json` | nombre y descripción de los comandos de barra (regla de Discord: minúsculas, sin espacios, hasta 32 caracteres) |
| `srv-*.json` | mensajes que el servidor envía a Discord, correos y archivos generados |
| `pkg-*.json` | textos de los módulos (Discord Admin, Comunidad, tickets, sorteos, whitelist) |

Las claves son las mismas en todos los idiomas.

## Contribuir

Lee el [CONTRIBUTING.es.md](CONTRIBUTING.es.md). En resumen: edita el archivo de tu idioma, mantén
los `{placeholders}` iguales a los del pt-BR y ejecuta `node .github/scripts/validate.mjs .` antes
de abrir el PR.

## Cuándo llega la traducción al bot

Las traducciones aprobadas entran en la próxima versión del bot. El texto que aún no se tradujo
aparece en portugués.

## Licencia

[CC BY 4.0](LICENSE) — puedes usarlo y adaptarlo, citando la fuente.
