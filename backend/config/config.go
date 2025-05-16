package config

import (
	"os"
	"log"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv        string
	ServerPort    string
	ListenAddress string
}

// Загрузка конфигурации из переменных окружения
func LoadConfig() (*Config, error) {
	_ = godotenv.Load()

	cfg := &Config{}
	cfg.AppEnv = getEnv("APP_ENV", "development")
	cfg.ServerPort = getEnv("PORT", "8080")
	cfg.ListenAddress = ":" + cfg.ServerPort

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