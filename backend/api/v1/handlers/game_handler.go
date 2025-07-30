package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rehydrate1/Patched-Game-Store/api/v1/middleware"
	"github.com/rehydrate1/Patched-Game-Store/api/v1/response"
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
		if errors.Is(err, service.ErrNotFound) {
			l.Warn().Err(err).Str("game_id", gameID).Msg("Handler: game not found")
			response.Error(w, http.StatusNotFound, "Game not found")
			return
		}
		l.Error().Err(err).Msg("Handler: failed to get game")
		response.Error(w, http.StatusInternalServerError, "internal Server Error")
		return
	}

	response.JSON(w, http.StatusOK, game)
}

// Метод-обработчик для создания игры
func (h *GameHandler) CreateGame(w http.ResponseWriter, r *http.Request) {
	l := middleware.GetLoggerFromContext(r)
	var input domain.CreateGameRequest

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		l.Warn().Err(err).Msg("Handler: failed to decode request body")
		response.Error(w, http.StatusBadRequest, "Invalid request body")
		return
	}
	defer r.Body.Close()

	// TODO: Валидация input

	createdGame, err := h.service.Create(r.Context(), input)
	if err != nil {
		// TODO: добавить проверку на service.ErrAlreadyExists
		l.Error().Err(err).Msg("Handler: failed to create game")
		response.Error(w, http.StatusInternalServerError, "Internal Server Error")
		return
	}

	response.JSON(w, http.StatusCreated, createdGame)
}

// Маршруты для ресурса "игры"
func (h *GameHandler) Routes() chi.Router {
	r := chi.NewRouter()
	
	r.Post("/", h.CreateGame)
	r.Get("/{gameID}", h.GetGame)

	return r
}