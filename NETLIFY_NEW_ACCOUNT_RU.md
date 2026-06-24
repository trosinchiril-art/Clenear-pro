# Netlify — новый аккаунт (инструкция)

## Главная причина ошибки 404

На **новом** сайте Netlify Forms **выключены по умолчанию**. Пока не включите детекцию форм, любой POST вернёт 404 — даже если в HTML есть `data-netlify="true"`.

## После подключения GitHub / deploy

### 1. Включите Form detection (обязательно)

Netlify → ваш сайт → **Forms** → **Enable form detection**

Или: **Forms → Usage and configuration → Form detection → Enable**

### 2. Redeploy

**Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### 3. Проверьте Forms

Netlify → **Forms** — должна появиться форма **offer**.

Если её **нет**:
- Убедитесь, что в deploy есть `contact.html` со скрытой формой `netlify`
- Повторите redeploy с очисткой кэша

### 4. Тест

Откройте: `https://rad-meringue-304b42.netlify.app/contact.html`  
(лучше с `.html`; `/contact` — только для просмотра)

Отправьте форму → заявки в **Forms → offer**

---

## Почему не `/contact`?

Форма отправляет POST на `/contact.html` или `/`. Путь `/contact` — это rewrite только для GET.

---

## Локально vs Netlify

| | Локально (XAMPP) | Netlify |
|--|------------------|---------|
| URL | http://localhost/CleanPro/contact.html | https://сайт.netlify.app/contact.html |
| Куда данные | phpMyAdmin (MySQL) | Netlify → Forms |
| PHP | ✅ работает | ❌ не работает |

Для отчёта: **локально** — phpMyAdmin, **онлайн** — Netlify Forms.

---

## Если Forms всё равно не работает

1. **Forms → Form detection** — включено
2. Redeploy с **Clear cache**
3. Тестируйте на `/contact.html`, не только `/contact`
