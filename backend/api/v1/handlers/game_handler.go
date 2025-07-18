package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rehydrate1/Patched-Game-Store/api/v1/middleware"
	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	"github.com/rehydrate1/Patched-Game-Store/internal/service"
)

// Структура для обработчиков, связанных с играми
type GameHandler struct {
	service service.GameService
}

// Создает новый экземпляр GameHandler
func NewGameHandler(s service.GameService) *GameHandler {
	return &GameHandler{
		service: s,
	}
}

// Метод-обработчик для получения игры
func (h *GameHandler) GetGame(w http.ResponseWriter, r *http.Request) {
	l := middleware.GetLoggerFromContext(r)
	gameID := chi.URLParam(r, "gameID")

	l.Info().Str("game_id", gameID).Msg("Handler: getting game")

	game, err := h.service.GetByID(r.Context(), gameID)
	if err != nil {
		// TODO: Здесь будет централизованная обработка ошибок
		l.Error().Err(err).Msg("Handler: failed to get game")
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	if game == nil {
		// TODO: Централизованная обработка ошибок (Not Found)
		http.Error(w, "Game not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(game)
}

// Метод-обработчик для создания игры
func (h *GameHandler) CreateGame(w http.ResponseWriter, r *http.Request) {
	l := middleware.GetLoggerFromContext(r)
	var input domain.CreateGameRequest

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		l.Error().Err(err).Msg("Handler: failed to decode request body")
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	// TODO: Валидация input

	createdGame, err := h.service.Create(r.Context(), input)
	if err != nil {
		l.Error().Err(err).Msg("Handler: failed to create game")
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdGame)
}
