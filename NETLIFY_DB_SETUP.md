# Formular pe Netlify — de ce nu merge MySQL direct

## Problema

1. **Netlify nu rulează PHP** — `php/submit_offer.php` nu funcționează pe site static
2. **Funcția Netlify** returnează 404 dacă nu e redeploy cu `netlify.toml` + `package.json`
3. **db4free** deseori blochează conexiuni de la serverele Netlify
4. **XAMPP local** nu e accesibil de pe internet

---

## Soluția care funcționează SIGUR (recomandat)

### Varianta A — Formular pe Netlify + MySQL pe InfinityFree (phpMyAdmin)

**Pas 1.** Înregistrare gratuită: https://www.infinityfree.com/

**Pas 2.** Creați site → încărcați folderul `php/` și `database/`

**Pas 3.** În panoul InfinityFree → **MySQL Databases** → creați bază → **phpMyAdmin** → Import `table_only.sql`

**Pas 4.** Editați `php/config.php` pe server cu datele MySQL de la InfinityFree

**Pas 5.** În proiect, editați `js/api-config.js`:

```javascript
window.CLEANPRO_CONFIG = {
  remoteApi: "https://NUMELE-SITE.infinityfreeapp.com/php/submit_offer.php",
};
```

**Pas 6.** Push pe GitHub → Netlify redeploy

Formularul de pe Netlify trimite datele la PHP pe InfinityFree → **salvare în MySQL (phpMyAdmin)**.

---

### Varianta B — Netlify Forms (fără MySQL online)

După **redeploy**, formularul salvează automat în:
**Netlify → Forms → offer**

Pentru raportul de practică folosiți **XAMPP local** pentru demonstrația phpMyAdmin.

---

### Varianta C — Totul local (pentru predare)

```
http://localhost/CleanPro/contact.html
```
+ XAMPP + phpMyAdmin local — funcționează 100%.

---

## Redeploy obligatoriu pe Netlify

După orice modificare de cod:
**Deploys → Trigger deploy → Clear cache and deploy**

Verificați că în deploy există:
- `netlify.toml`
- `package.json`
- `netlify/functions/submit-offer.js`
- `contact.html` cu `data-netlify="true"`

---

## Verificare rapidă

| Test | URL |
|------|-----|
| Site live | https://sparkly-begonia-f8708c.netlify.app/contact |
| Funcție API | https://sparkly-begonia-f8708c.netlify.app/.netlify/functions/submit-offer (POST) |
| Local | http://localhost/CleanPro/contact.html |

Dacă funcția returnează **404** → lipsește redeploy cu fișierele Netlify Functions.
