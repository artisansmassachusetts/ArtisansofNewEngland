# Massachusetts Artisans

A responsive, multi-page static website for a community connecting Massachusetts makers, tradespeople, and apprentices.

## Pages

- `index.html` — home and community introduction
- `mentoring.html` — mentoring and peer connection
- `skills.html` — hands-on learning and skills development
- `resources.html` — grants, business guidance, and regional support links
- `story.html` — founder note, purpose, and values
- `contact.html` — accessible contact form that prepares an email in the visitor’s mail app

## Run locally

Open `index.html` directly, or serve this directory with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment notes

This site has no build step or runtime dependencies. Deploy the files to GitHub Pages or any static host. Fonts load from Google Fonts and photographs use Unsplash image URLs; replace them with locally hosted, appropriately licensed assets if you need fully self-hosted media. The contact form is intentionally client-side and does not transmit or store submissions; update `data-email` in `contact.html` to a monitored email address before launch, or connect a form service/backend for direct submission.

The site uses semantic HTML, responsive layouts, visible keyboard focus, a skip link, reduced-motion support, and a persistent bottom navigation. Verify external resource program details and availability before publishing.
