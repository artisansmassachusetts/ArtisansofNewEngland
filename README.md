# Artisans of New England

A responsive, multi-page static website for a community connecting New England makers, tradespeople, and apprentices.

## Pages

- `index.html` — home and community introduction
- `mentoring.html` — mentoring and peer connection
- `skills.html` — hands-on learning and skills development
- `resources.html` — grants, business guidance, and regional support links
- `story.html` — founder note, purpose, and values
- `contact.html` — accessible contact form that prepares an email in the visitor’s mail app

## Run locally

Open `index.html` directly, or serve this directory with a static file server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

This is a static site with no build step. GitHub Pages can publish the `main` branch from the repository root. The contact form prepares a draft in the visitor’s email app rather than storing submissions on the site.
