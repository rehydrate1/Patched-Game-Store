package handlers

import (
	"net/http"
	"fmt"
	"github.com/go-chi/chi/v5"
)

// Получение игры по ID
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

// Поиск игр через query-параметры
func SearchGamesHandler(w http.ResponseWriter, r *http.Request) {
	queryValues := r.URL.Query()

	serchTerm := queryValues.Get("q")
	genre := queryValues.Get("genre")
	limit := queryValues.Get("limit")

	// TODO: Сделать реальную логику поиска/фильтрации
	message := fmt.Sprintf("Searching for: '%s', Genre: '%s', Limit: '%s'", serchTerm, genre, limit)
	if serchTerm == "" && genre == "" && limit == "" {
		message = "No search parameters provided. Try /search?q=mygame&genre=action&limit=10"
	}

	response := fmt.Sprintf(`{"status": "success", "message": "%s"}`, message)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}