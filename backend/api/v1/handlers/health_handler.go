package handlers

import (
	"github.com/rehydrate1/Patched-Game-Store/api/v1/middleware"
	"net/http"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	l := middleware.GetLoggerFromContext(r)
	l.Info().Msg("Health check endpoint called")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "OK"}`))
}
