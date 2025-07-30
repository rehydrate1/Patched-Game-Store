# Patched-Game-Store

Это монорепозиторий содержащий бэкенд на Go и фронтенд на React.

## Структура проекта

-   `/backend`: Исходный код бэкенд-сервиса на Go.
-   `/frontend`: Исходный код клиентского приложения на React (Next.js).
-   `/backend/migrations`: SQL-миграции для базы данных бэкенда.
-   `docker-compose.yml`: Файл для оркестрации сервисов разработки (база данных, бэкенд, фронтенд).
-   `.env.example`: Файл-шаблон с необходимыми переменными окружения.

---

## Начало работы

### Необходимые инструменты

Перед началом работы убедитесь, что у вас установлены:
1.  **Git**
2.  **Go** (версия 1.20+)
3.  **Node.js** и **yarn**
4.  **Docker** и **Docker Compose**
5.  **golang-migrate CLI** (инструкции по установке: [ссылка](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate#installation))

### Инструкция по запуску

1.  **Клонировать репозиторий:**
    ```bash
    git clone https://github.com/rehydrate1/Patched-Game-Store.git
    cd Patched-Game-Store
    ```

2.  **Настроить переменные окружения:**
    Скопируйте файл-шаблон `.env.example` в новый файл `.env`.
    ```bash
    cp .env.example .env
    ```
    Откройте `.env` и заполните необходимые значения, особенно пароли для базы данных (`DB_PASSWORD` и `DB_ROOT_PASSWORD`).

3.  **Запустить сервисы с помощью Docker Compose:**
    Эта команда запустит базу данных MySQL в Docker-контейнере.
    ```bash
    docker-compose up -d db
    ```
    *Флаг `-d` запускает контейнер в фоновом режиме. `db` указывает запустить только сервис базы данных.*

4.  **Применить миграции базы данных:**
    Эта команда создаст все необходимые таблицы в базе данных. Убедитесь, что вы находитесь в папке `/backend`.
    ```bash
    cd backend
    migrate -path migrations -database 'mysql://gamestore_user:your_secret_user_password@tcp(localhost:3307)/gamestore_db' up
    ```
    *Замените `your_secret_user_password` и порт `3307` на значения из вашего `.env` файла.*

5.  **Запустить бэкенд-сервер:**
    Из папки `/backend` выполните:
    ```bash
    go run ./cmd/app/main.go
    ```
    Бэкенд должен запуститься (по умолчанию на `http://localhost:8080`).

6.  **Запустить фронтенд-сервер:**
    Перейдите в папку `/frontend`, установите зависимости используя yarn и запустите dev-сервер.
    ```bash
    cd ../frontend
    yarn install
    yarn dev
    ```
    Фронтенд должен запуститься (по умолчанию на `http://localhost:3000`).

После выполнения всех шагов приложение будет полностью готово к работе. Бэкенд доступен на `http://localhost:8080/api/v1`, а фронтенд на `http://localhost:3000`.

---

## API Документация

API спроектировано с использованием спецификации OpenAPI.
-   Файл спецификации: `/backend/api/openapi.yaml`
-   Интерактивная документация (Swagger UI) будет доступна по адресу `...` (когда мы ее добавим).

## Полезные команды

-   **Запустить все сервисы Docker:** `docker-compose up -d`
-   **Остановить все сервисы Docker:** `docker-compose stop`
-   **Остановить и удалить контейнеры:** `docker-compose down`
-   **Остановить, удалить контейнеры и тома (удалит данные БД!):** `docker-compose down -v`
-   **Откатить последнюю миграцию:** `cd backend && migrate ... down 1`
