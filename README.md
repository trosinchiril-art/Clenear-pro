# Clean Pro — Site web companie de curățenie

**Sarcină individuală** · Practica tehnologică · 120 ore  
**IP Colegiul „Iulia Hasdeu" din Cahul** · Grupa AAW 2331 · 2026

Site responsive pentru compania fictivă **Clean Pro** (Cahul), realizat cu HTML5, CSS3, Bootstrap 5 și JavaScript vanilla.

## Structura proiectului

```
CleanPro/
├── index.html          # Acasă
├── services.html       # Servicii
├── packages.html       # Pachete + calculator
├── about.html          # Despre noi
├── reviews.html        # Recenzii
├── contact.html        # Contact + formular
├── favicon.svg
├── README.md
├── css/style.css
├── js/
│   ├── main.js         # Meniu, smooth scroll, back-to-top, counter, slider
│   ├── validation.js   # Validare formular
│   ├── calculator.js   # Calculator preț
│   └── gallery.js      # Galerie before/after
├── video/              # Testimoniale video (MP4 locale)
│   ├── cleaning-service.mp4
│   └── cleaning-result.mp4
└── img/                # Imagini (înlocuiți SVG cu fotografii reale)
```

## Tehnologii

- HTML5 semantic
- CSS3 (Flexbox, Grid, animații, media queries)
- Bootstrap 5.3
- JavaScript (DOM, validare, Intersection Observer)
- Google Fonts: Montserrat + Open Sans
- Bootstrap Icons

## Paletă culori

| Rol        | Cod       |
|-----------|-----------|
| Principal | `#03A9F4` |
| Accent    | `#4CAF50` |

## Funcționalități JavaScript

| # | Funcționalitate        | Fișier / Pagină        |
|---|------------------------|------------------------|
| 1 | Validare formular      | validation.js / contact |
| 2 | Meniu responsive       | main.js / toate         |
| 3 | Slider recenzii        | main.js / reviews       |
| 4 | Smooth scroll          | main.js / toate         |
| 5 | Back to top            | main.js / toate         |
| 6 | Calculator preț        | calculator.js / packages|
| 7 | Tabs pachete           | Bootstrap / packages    |
| 8 | Galerie before/after   | gallery.js / index, services |
| 9 | Counter animat         | main.js / index, about  |
| 10| Accordion servicii     | Bootstrap / services    |

## Rulare locală

Deschideți `index.html` în browser sau folosiți Live Server din VS Code:

```bash
# Cu Python (opțional)
python -m http.server 8080
```

Apoi accesați `http://localhost:8080`

## Publicare (GitHub Pages)

1. Creați repository pe GitHub
2. Încărcați fișierele proiectului
3. **Settings → Pages → Source**: branch `main`, folder `/ (root)`
4. Site-ul va fi disponibil la `https://<user>.github.io/<repo>/`

## Imagini

Fișierele din `img/` sunt **placeholder SVG** pentru dezvoltare. Pentru predare:

1. Înlocuiți cu fotografii reale (curățenie, echipă, before/after)
2. Comprimați cu [TinyPNG](https://tinypng.com) sau [Squoosh](https://squoosh.app) — max **200 KB/imagine**
3. Păstrați atribute `alt` descriptive

## Video testimoniale

Secțiunea din `reviews.html` folosește **fișiere MP4 locale** (nu YouTube), ca să funcționeze și fără internet / fără eroarea 153.

Înlocuiți `video/cleaning-service.mp4` și `video/cleaning-result.mp4` cu clipurile reale ale companiei (același nume de fișier).

Clipuri actuale (Mixkit, licență gratuită):
- `cleaning-service.mp4` — pulverizare soluție curățenie pe geam
- `cleaning-result.mp4` — curățenie detaliată a locuinței

## Testare

- Responsive: 375px, 768px, 1440px
- [W3C HTML Validator](https://validator.w3.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/) — țintă scor ≥ 70 mobil

## Autor

Elev/ă: _[Completați numele]_  
Conducător: Bodlev Veaceslav  
Cahul, 2026

## Licență

Proiect educațional — IP Colegiul „Iulia Hasdeu" din Cahul.
"# Clenear-pro" 
