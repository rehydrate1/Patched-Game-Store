package main

import (
	"log"
	"net/http"
	"fmt"

	"github.com/rehydrate1/Patched-Game-Store/internal/config"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("FATAL: Could not load configuration: %v",err)
	}
	
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "OK")
	})

	log.Printf("Server started at localhost:%s", cfg.ServerPort)
	if err := http.ListenAndServe(cfg.ListenAddress, mux); err != nil {
		log.Fatalf("FATAL: Could not start server: %v", err)
	}
}