package middleware

import (
	"net/http"
	"context"

	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// Ключ для хранения логгера в контексте
type LoggerKey struct{}

// Создаёт логгер с ID запроса и помещает его в контекст
func ContextLoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := middleware.GetReqID(r.Context())
		ctxLogger := log.Logger.With().Str("request_id", requestID).Logger()
		ctxWithLogger := context.WithValue(r.Context(), LoggerKey{}, &ctxLogger)

		next.ServeHTTP(w, r.WithContext(ctxWithLogger))
	})
}

// Извлекает логгер из контекста
// если таковой не найден - возвращает глобальный
func GetLoggerFromContext(r *http.Request) *zerolog.Logger {
	if logger, ok := r.Context().Value(LoggerKey{}).(*zerolog.Logger); ok {
		return logger
	}
	globalLogger := log.Logger
	return &globalLogger
}