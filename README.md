# Clean Pro — Site web companie de curățenie

Site responsive: HTML5, CSS3, Bootstrap 5, JavaScript, PHP + MySQL (local), Netlify Forms (online).

## Formular

| Mediu | Unde se salvează |
|-------|------------------|
| **Local (XAMPP)** | MySQL → phpMyAdmin (`cleanpro.offer_requests`) |
| **Netlify** | Netlify → Forms → offer |

## Local (XAMPP)

1. Rulați `start-xampp.bat` (Apache + MySQL)
2. phpMyAdmin → Import → `database/schema.sql`
3. Deschideți: http://localhost/CleanPro/contact.html

Detalii în română/rusă: `LOCAL_SETUP_RU.md`

## Netlify

Site live: https://rad-meringue-304b42.netlify.app/contact.html

După deploy, în Netlify: **Forms → Enable form detection**. Trimiterile apar în **Forms → offer**.

## Structură

```
CleanPro/
├── index.html, services.html, packages.html, about.html, reviews.html, contact.html
├── css/style.css
├── js/main.js, validation.js, calculator.js, gallery.js
├── php/submit_offer.php, db.php, config.php
├── database/schema.sql
├── netlify.toml
└── start-xampp.bat
```

## Autor

Grupa AAW 2331 · IP Colegiul „Iulia Hasdeu" din Cahul · 2026
