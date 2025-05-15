package handlers

import (
	"net/http"
	"fmt"
	"github.com/go-chi/chi/v5"
)

func GetGameHandler(w http.ResponseWriter, r *http.Request) {
	gameID := chi.URLParam(r, "gameID")
	if gameID == "" {
		http.Error(w, "Game ID is required", http.StatusBadRequest)
		return
	}

	// TODO: сделать логику получения игры из бд
	response := fmt.Sprintf(`{"status": "success", "message": "Fetching game with ID: %s"}`, gameID)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}