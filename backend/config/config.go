package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	ServerPort    string
	ListenAddress string
}

func LoadConfig() (*Config, error) {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		fmt.Println("Warning: PORT env not set. Using default :8080")
	}

	cfg := &Config{
		ServerPort:    port,
		ListenAddress: ":" + port,
	}

	return cfg, nil
}
