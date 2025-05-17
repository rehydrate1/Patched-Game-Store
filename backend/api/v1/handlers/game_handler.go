package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	customMiddleware "github.com/rehydrate1/Patched-Game-Store/api/v1/middleware"
)

// Получение игры по ID
func GetGameHandler(w http.ResponseWriter, r *http.Request) {
	l := customMiddleware.GetLoggerFromContext(r)
	gameID := chi.URLParam(r, "gameID")
	if gameID == "" {
		l.Error().Msg("Game ID is required in path")
		http.Error(w, "Game ID is required", http.StatusBadRequest)
		return
	}
	l.Info().Str("game_id", gameID).Msg("Fetching game details")

	// TODO: сделать логику получения игры из бд
	response := fmt.Sprintf(`{"status": "success", "message": "Fetching game with ID: %s"}`, gameID)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}

// Поиск игр через query-параметры
func SearchGamesHandler(w http.ResponseWriter, r *http.Request) {
	l := customMiddleware.GetLoggerFromContext(r)
	queryValues := r.URL.Query()

	
	searchTerm := queryValues.Get("q")
	genre := queryValues.Get("genre")
	limit := queryValues.Get("limit")
	
	logEvent := l.Info()
	if searchTerm != "" {
		logEvent = logEvent.Str("search_term", searchTerm)
	}
	if genre != "" {
		logEvent = logEvent.Str("genre", genre)
	}
	if limit != "" {
		logEvent = logEvent.Str("limit", limit)
	}
	logEvent.Msg("Search games request received")
	
	// TODO: Сделать реальную логику поиска/фильтрации
	message := fmt.Sprintf("Searching for: '%s', Genre: '%s', Limit: '%s'", searchTerm, genre, limit)
	if searchTerm == "" && genre == "" && limit == "" {
		message = "No search parameters provided. Try /search?q=mygame&genre=action&limit=10"
	}

	response := fmt.Sprintf(`{"status": "success", "message": "%s"}`, message)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}

// Создание новой игры
func CreateGameHandler(w http.ResponseWriter, r *http.Request) {
	l := customMiddleware.GetLoggerFromContext(r)
	var input domain.CreateGameRequest

	l.Debug().Msg("Attempting to create a new game")

	body, err := io.ReadAll(r.Body)
	if err != nil {
		l.Error().Err(err).Msg("Failed to read request body")
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	if err := json.Unmarshal(body, &input); err != nil {
		l.Error().Err(err).Msg("Invalid JSON format")
		http.Error(w, "Invalid JSON format: "+err.Error(), http.StatusBadRequest)
		return
	}

	// TODO: валидация входных данных
	// TODO: логика создания игры в сервисе и сохранения в БД

	responsePayload := struct {
		ID string `json:"id"`
		domain.CreateGameRequest
	}{
		ID:                "temp-game-id-123", // заглушка
		CreateGameRequest: input,
	}
	l.Info().Str("game_id", responsePayload.ID).Str("title", input.Title).Msg("Game created successfully")

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(responsePayload)
}
