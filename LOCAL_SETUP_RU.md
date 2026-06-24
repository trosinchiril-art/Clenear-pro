# Локальный запуск (XAMPP) — по-русски

## Почему не работает localhost?

Чаще всего **Apache не запущен** в XAMPP.

Страница `http://localhost/CleanPro/contact.html` работает **только** когда:
- ✅ XAMPP установлен в `C:\xampp`
- ✅ **Apache** — зелёный (Running)
- ✅ **MySQL** — зелёный (Running)
- ✅ Открываете через **localhost**, а не двойным щелчком по файлу

---

## Быстрый запуск (3 шага)

### 1. Дважды щёлкните `start-xampp.bat` в папке CleanPro

Скрипт сам:
- создаст ссылку в `htdocs`
- запустит Apache и MySQL
- откроет браузер

### 2. Или вручную через XAMPP Control Panel

1. Откройте **XAMPP Control Panel**
2. Нажмите **Start** у **Apache**
3. Нажмите **Start** у **MySQL**

### 3. Откройте в браузере

```
http://localhost/CleanPro/contact.html
```

**Проверка:** http://localhost/CleanPro/php/test_connection.php  
Должно быть: «Totul funcționează» / всё работает.

---

## База данных (phpMyAdmin)

1. http://localhost/phpmyadmin
2. Импорт → `database/schema.sql`
3. После отправки формы → база `cleanpro` → таблица `offer_requests`

---

## Частые ошибки

| Проблема | Решение |
|----------|---------|
| Страница не открывается | Запустите Apache в XAMPP |
| «Не удалось подключиться к серверу» | Apache/MySQL не запущены |
| Открыли файл с Рабочего стола (file://) | Используйте только `http://localhost/...` |
| Ошибка базы данных | Импортируйте `schema.sql` в phpMyAdmin |
| Телефон не принимается | Формат: `+373` + 8 цифр (ровно 12 символов) |

---

## Netlify vs локально

| Где | URL | База данных |
|-----|-----|-------------|
| **Локально** | http://localhost/CleanPro/contact.html | phpMyAdmin на компьютере |
| **Онлайн** | https://sparkly-begonia-f8708c.netlify.app/contact | Netlify Forms или InfinityFree |

Для отчёта по практике удобно показать **локальную** версию с phpMyAdmin.
