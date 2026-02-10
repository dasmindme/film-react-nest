# FILM!

## Деплой

Проект задеплоен на удалённый сервер в Yandex Cloud и доступен по доменному имени:

- Продакшен: http://filmservice.students.nomorepartiessbs.ru
- PgAdmin (админка PostgreSQL): http://filmservice.students.nomorepartiessbs.ru:8080

## Инфраструктура

Проект разворачивается в Docker с помощью `docker-compose`:

- `frontend` — Vite/React, собирается в образ `ghcr.io/dasmindme/film-react-nest/film-frontend:review-2`, статика монтируется в nginx.
- `backend` — NestJS, образ `ghcr.io/dasmindme/film-react-nest/film-backend:review-2`, работает с PostgreSQL и раздаёт статику `/content/afisha/*`.
- `nginx` — образ `ghcr.io/dasmindme/film-react-nest/film-nginx:review-2`, раздаёт фронтенд и проксирует `/api/` и `/content/` в backend.
- `postgres` — PostgreSQL 16, хранит данные фильмов и расписаний.
- `pgadmin` — pgAdmin 4 для администрирования БД.

Запуск локально:

```bash
cd film-react-nest
docker compose up -d
```

После запуска:
- фронтенд и API доступны по `http://localhost` (через nginx);
- pgAdmin — по `http://localhost:8080`.

## CI/CD

Сборка и публикация Docker-образов настроены через GitHub Actions в workflow
[`.github/workflows/docker-build.yml`](.github/workflows/docker-build.yml:1):

- при пуше в ветку `review-2` собираются образы `film-frontend`, `film-backend`, `film-nginx` и пушатся в GHCR;
- после успешной сборки выполняется деплой на сервер по SSH: на ВМ выполняется
  `cd ~/film-app && sudo docker compose pull && sudo docker compose up -d`,
  что обновляет запущенные контейнеры до последних версий образов.

## Установка (локальная разработка)

### MongoDB (старый вариант)

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`).

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда:

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд:

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` — тип драйвера СУБД (в текущей конфигурации используется PostgreSQL);
* остальные параметры подключения к БД — см. `docker-compose.yml` и `.env.example`.

Запустите бэкенд локально:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.

