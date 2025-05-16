package v1

import (
	"net/http"

	"github.com/rehydrate1/Patched-Game-Store/api/v1/handlers"
	customMiddleware "github.com/rehydrate1/Patched-Game-Store/api/v1/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func NewRouter() http.Handler {
	r := chi.NewRouter()

	// Настройка CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Custom-Header"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	r.Use(corsMiddleware.Handler)

	// Стандартные middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(customMiddleware.CommonHeadersMiddleware)

	// Группа маршрутов для /api/v1
	r.Get("/health", healthCheckHandler)
	r.Get("/search", handlers.SearchGamesHandler)
	r.Get("/games", handlers.CreateGameHandler)
	r.Get("/games/{gameID}", handlers.GetGameHandler)

	return r
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "OK"}`))
}
