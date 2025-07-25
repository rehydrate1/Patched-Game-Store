package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"

	v1 "github.com/rehydrate1/Patched-Game-Store/api/v1"
	"github.com/rehydrate1/Patched-Game-Store/config"
	"github.com/rehydrate1/Patched-Game-Store/internal/database"
	"github.com/rehydrate1/Patched-Game-Store/internal/logger"
	"github.com/rehydrate1/Patched-Game-Store/internal/repository/mysql"
	"github.com/rehydrate1/Patched-Game-Store/internal/service"
)

func main() {
	// конфиг
	appConfig, err := config.LoadConfig("..") // TODO: сделать флаг
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to load configuration")
	}

	// логгер
	logger.InitLogger(appConfig.AppEnv)
	log.Info().Msg("Starting Game Store API...")

	// соединение с базой данных
	log.Info().Msg("Initializing database connection...")
	db, err := database.NewConnection(&appConfig.DBConfig)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to connect to database")
	}
	defer db.Close()
	log.Info().Msg("Database connection established successfully")

	log.Info().Msg("Initializing dependencies...")

	gameRepo := mysql.NewGameRepository(db)
	log.Info().Msg("Game repository initialized")

	globalLogger := log.Logger
	gameService := service.NewGameService(gameRepo, &globalLogger)
	log.Info().Msg("Game service initialized")

	routerV1 := v1.NewRouter(gameService)
	log.Info().Msg("API v1 router initialized")

	mainRouter := chi.NewRouter()
	mainRouter.Mount("/api/v1", routerV1)

	mainRouter.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "API Gateway OK"}`))
	})

	log.Printf("Server started at http://localhost:%s", appConfig.ServerPort)
	if err := http.ListenAndServe(appConfig.ListenAddress, mainRouter); err != nil {
		log.Fatal().Err(err).Msg("Failed to start server")
	}
}
