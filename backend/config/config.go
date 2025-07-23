package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Конфигурация подключения к базе данных
type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

// Конфигурация приложения
type AppConfig struct {
	AppEnv        string
	ServerPort    string
	ListenAddress string
	DBConfig      DBConfig
}

// Загрузка конфигурации из переменных окружения
func LoadConfig(path string) (*AppConfig, error) {
	if err := godotenv.Load(path + "/.env"); err != nil {
		log.Println("No .env file found or error loading .env, relying on system environment variables")
	}

	cfg := &AppConfig{}
	cfg.AppEnv = getEnv("APP_ENV", "development")
	cfg.ServerPort = getEnv("PORT", "8080")
	cfg.ListenAddress = ":" + cfg.ServerPort

	cfg.DBConfig.Host = getEnv("DB_HOST", "localhost")
	cfg.DBConfig.Port = getEnv("DB_PORT", "3306")
	cfg.DBConfig.User = getEnv("DB_USER", "root")
	cfg.DBConfig.Password = getEnv("DB_PASSWORD", "")
	cfg.DBConfig.DBName = getEnv("DB_NAME", "")
	cfg.DBConfig.SSLMode = getEnv("DB_SSLMODE", "disable")

	log.Printf("Configuration loaded: AppEnv=%s, ServerPort=%s", cfg.AppEnv, cfg.ServerPort)
	return cfg, nil
}

// Вспомогательная функция для получения переменной окружения или значения по умолчанию
func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	log.Printf("Environment variable %s not set, using default value: %s", key, defaultValue)
	return defaultValue
}
