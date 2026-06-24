# Clean Pro — Site web companie de curățenie

Site responsive: HTML5, CSS3, Bootstrap 5, JavaScript, PHP (local) + Netlify Functions (online).

## Formular → MySQL

| Mediu | Cum funcționează |
|-------|------------------|
| **Local (XAMPP)** | `php/submit_offer.php` → MySQL local |
| **Netlify** | `/.netlify/functions/submit-offer` → MySQL în cloud |

> Netlify **nu rulează PHP**. Baza locală XAMPP nu e accesibilă de pe internet — pentru site-ul live trebuie **MySQL remote** (cloud).

---

## 1. Local (XAMPP + phpMyAdmin)

1. XAMPP → Apache + MySQL ON
2. Proiect în `C:\xampp\htdocs\CleanPro` (sau junction)
3. phpMyAdmin → Import → `database/schema.sql`
4. Deschide: http://localhost/CleanPro/contact.html

---

## 2. Netlify (site live)

### Pas 1 — MySQL în cloud (gratuit)

Înregistrează-te pe un serviciu cu **acces remote** la MySQL, de ex.:
- [db4free.net](https://www.db4free.net/)
- [FreeMySQLHosting](https://www.freemysqlhosting.net/)

1. Creează baza de date
2. Deschide **phpMyAdmin** de la provider
3. Importă `database/table_only.sql` (sau `schema.sql`)
4. Notează: **host**, **user**, **parolă**, **nume bază**

### Pas 2 — Variabile în Netlify

Netlify → Site → **Site configuration** → **Environment variables** → Add:

| Variabilă | Exemplu |
|-----------|---------|
| `DB_HOST` | `db4free.net` |
| `DB_USER` | `cleanpro_user` |
| `DB_PASSWORD` | `parola_ta` |
| `DB_NAME` | `cleanpro` |
| `DB_PORT` | `3306` |

### Pas 3 — Redeploy

Push pe GitHub sau **Deploys** → **Trigger deploy** → **Clear cache and deploy**.

După deploy, formularul de pe https://sparkly-begonia-f8708c.netlify.app/contact trimite datele în MySQL remote.

### Test

Trimite formularul → verifică în phpMyAdmin cloud → tabela `offer_requests`.

---

## Structură

```
CleanPro/
├── netlify/functions/submit-offer.js  # API pentru Netlify
├── netlify.toml
├── package.json
├── php/submit_offer.php               # API pentru XAMPP
├── database/schema.sql
└── js/validation.js                   # alege automat endpoint-ul
```

## Autor

Grupa AAW 2331 · IP Colegiul „Iulia Hasdeu" din Cahul · 2026
