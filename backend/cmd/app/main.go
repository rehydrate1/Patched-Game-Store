package main

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rehydrate1/Patched-Game-Store/api/v1"
	"github.com/rehydrate1/Patched-Game-Store/config"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("FATAL: Could not load configuration: %v",err)
	}
	
	routerV1 := v1.NewRouter()

	mainRouter := chi.NewRouter()
	mainRouter.Mount("/api/v1", routerV1)

	mainRouter.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "API Gateway OK"'}`))
	})

	log.Printf("Server started at http://localhost:%s", cfg.ServerPort)
	if err := http.ListenAndServe(cfg.ListenAddress, mainRouter); err != nil {
		log.Fatalf("FATAL: Could not start server: %v", err)
	}
}