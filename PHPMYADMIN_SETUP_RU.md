# Сохранение заявок в phpMyAdmin (MySQL)

## Важно понять

**Netlify не может писать в phpMyAdmin на вашем компьютере (XAMPP).**  
Локальный MySQL доступен только с `localhost`.

Чтобы заявки с **онлайн-сайта** попадали в **phpMyAdmin**, нужна **база MySQL в интернете**.

---

## Вариант 1 — Локально (уже работает)

Для отчёта в колледже этого часто достаточно.

1. Запустите `start-xampp.bat` (Apache + MySQL)
2. Откройте: http://localhost/CleanPro/contact.html
3. Отправьте форму
4. phpMyAdmin: http://localhost/phpmyadmin → база **cleanpro** → таблица **offer_requests**

| Параметр | Значение |
|----------|----------|
| Пользователь | `root` |
| Пароль | *(пустой)* |
| База | `cleanpro` |

---

## Вариант 2 — Онлайн-сайт + phpMyAdmin (InfinityFree, бесплатно)

Сайт на Netlify отправляет данные на PHP-хостинг → MySQL → **phpMyAdmin в облаке**.

### Шаг 1. Регистрация

https://www.infinityfree.com/ → создайте аккаунт и сайт.

### Шаг 2. Загрузите PHP

Через **File Manager** или FTP загрузите на сервер папку `php/` из проекта:

```
htdocs/
  php/
    config.php
    db.php
    submit_offer.php
```

### Шаг 3. Создайте MySQL

InfinityFree → **MySQL Databases** → Create database.

Запишите:
- Host (например `sqlXXX.infinityfree.com`)
- Database name
- Username
- Password

### Шаг 4. Импорт таблицы

InfinityFree → **phpMyAdmin** → ваша база → **Import** → файл `database/table_only.sql`

### Шаг 5. Настройте `php/config.php` на сервере

```php
return [
    'host' => 'sqlXXX.infinityfree.com',
    'dbname' => 'имя_базы',
    'username' => 'имя_пользователя',
    'password' => 'ваш_пароль',
    'charset' => 'utf8mb4',
];
```

### Шаг 6. Укажите URL в проекте

Файл `js/api-config.js`:

```javascript
window.CLEANPRO_CONFIG = {
  remoteApi: "https://ВАШ-САЙТ.infinityfreeapp.com/php/submit_offer.php",
};
```

### Шаг 7. Push и redeploy

```bash
git add js/api-config.js
git commit -m "Configure remote MySQL API"
git push origin main
```

Netlify автоматически передеплоит сайт.

### Шаг 8. Проверка

1. Откройте https://rad-meringue-304b42.netlify.app/contact.html
2. Отправьте форму
3. Заявка появится в **phpMyAdmin на InfinityFree** (не в локальном XAMPP)

---

## Вариант 3 — Netlify Function + облачная MySQL

Если есть доступ к удалённой MySQL (PlanetScale, db4free и т.д.):

Netlify → **Site configuration** → **Environment variables**:

| Переменная | Пример |
|------------|--------|
| `DB_HOST` | `sqlXXX.dbhost.com` |
| `DB_USER` | `user` |
| `DB_PASSWORD` | `password` |
| `DB_NAME` | `cleanpro` |
| `DB_PORT` | `3306` |

Импортируйте `database/table_only.sql` в эту базу.  
Redeploy на Netlify. Форма вызовет `/.netlify/functions/submit-offer`.

---

## Что выбрать для практики

| Цель | Решение |
|------|---------|
| Показать phpMyAdmin на защите | **Вариант 1** (localhost) |
| Онлайн-сайт + phpMyAdmin | **Вариант 2** (InfinityFree) |
| Только Netlify, без MySQL | Не подходит — нужна база |

---

## Частые ошибки

| Ошибка | Причина |
|--------|---------|
| Форма на Netlify «успешна», но в локальном phpMyAdmin пусто | Онлайн не пишет в XAMPP — это разные базы |
| CORS error | Проверьте, что `submit_offer.php` на сервере обновлён |
| 500 от PHP | Неверный `config.php` или таблица не импортирована |
| 500 от Netlify Function | Не заданы `DB_*` в Environment variables |
