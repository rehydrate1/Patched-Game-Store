package logger

import (
	"os"
	"strings"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// Инициализация глобального логгера zerolog
func InitLogger(appEnv string) {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	logLevel := zerolog.InfoLevel
	if strings.ToLower(appEnv) == "development" {
		logLevel = zerolog.DebugLevel
	} else if strings.ToLower(appEnv) == "staging" {
		logLevel = zerolog.DebugLevel
	}

	zerolog.SetGlobalLevel(logLevel)

	if strings.ToLower(appEnv) == "development" {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339})
	}
	log.Info().Str("app_env", appEnv).Msg("Logger initialized")
}
