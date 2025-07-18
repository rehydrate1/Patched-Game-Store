package repository

import (
	"context"

	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	"github.com/rs/zerolog/log"
)

// Определяет интерфейс для работы с данными игр
type GameRepository interface {
	Create(ctx context.Context, game *domain.Game) error
	GetByID(ctx context.Context, id string) (*domain.Game, error)
	// TODO: Добавить другие методы(list, update, delete)
}

// in-memory реализация GameRepository для демонстрации и тестов
type gameMemoryRepository struct {
	games map[string]*domain.Game
}

func NewGameMemoryRepository() GameRepository {
	return &gameMemoryRepository{
		games: make(map[string]*domain.Game),
	}
}

// Имитирует создание игры
func (r *gameMemoryRepository) Create(ctx context.Context, game *domain.Game) error {
	log.Info().Str("title", game.Title).Msg("Repository: creating game in memory")
	r.games[game.ID] = game
	return nil
}

// Имитирует получение игры по id
func (r *gameMemoryRepository) GetByID(ctx context.Context, id string) (*domain.Game, error) {
	log.Info().Str("id", id).Msg("Repository: getting game by id from memory")
	if game, ok := r.games[id]; ok {
		return game, nil
	}
	return nil, nil
}
