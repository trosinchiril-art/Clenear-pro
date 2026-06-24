# Локальный запуск (XAMPP)

## Быстрый старт

1. Дважды щёлкните `start-xampp.bat` (Apache + MySQL)
2. phpMyAdmin → Import → `database/schema.sql`
3. Откройте: http://localhost/CleanPro/contact.html

Проверка PHP: http://localhost/CleanPro/php/test_connection.php

## База данных

| Параметр | Значение |
|----------|----------|
| Пользователь | `root` |
| Пароль | *(пустой)* |
| База | `cleanpro` |
| Таблица | `offer_requests` |

## Netlify (онлайн)

- Сайт: https://rad-meringue-304b42.netlify.app/contact.html
- Заявки: Netlify → **Forms** → **offer**

## Частые ошибки

| Проблема | Решение |
|----------|---------|
| Страница не открывается | Запустите Apache в XAMPP |
| Ошибка базы данных | Импортируйте `schema.sql` |
| Открыли файл с диска (file://) | Используйте `http://localhost/...` |
| Телефон не принимается | `+373` + 8 цифр (12 символов) |
