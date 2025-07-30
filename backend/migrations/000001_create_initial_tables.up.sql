
-- Основная таблица игр
CREATE TABLE IF NOT EXISTS games (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    release_date DATE,
    cover_image_url VARCHAR(2048),
    developer VARCHAR(255),
    publisher VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Таблицы-справочники
CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Связующие таблицы
CREATE TABLE IF NOT EXISTS game_genres (
    game_id CHAR(36) NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_platforms (
    game_id CHAR(36) NOT NULL,
    platform_id INT NOT NULL,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_applications (
    game_id CHAR(36) NOT NULL,
    application_id INT NOT NULL,
    PRIMARY KEY (game_id, application_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Таблица галереи
CREATE TABLE IF NOT EXISTS game_gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id CHAR(36) NOT NULL,
    image_url VARCHAR(2048) NOT NULL,
    caption VARCHAR(255),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Таблица системных требований
CREATE TABLE IF NOT EXISTS system_requirements (
    game_id CHAR(36) PRIMARY KEY,
    os_min VARCHAR(255),
    processor_min VARCHAR(255),
    memory_min VARCHAR(255),
    graphics_min VARCHAR(255),
    storage_min VARCHAR(255),
    os_rec VARCHAR(255),
    processor_rec VARCHAR(255),
    memory_rec VARCHAR(255),
    graphics_rec VARCHAR(255),
    storage_rec VARCHAR(255),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);