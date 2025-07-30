package repository

import (
	"context"
	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
)

// GameRepository определяет интерфейс для работы с данными игр.
type GameRepository interface {
	Create(ctx context.Context, game *domain.Game) error
	GetByID(ctx context.Context, id string) (*domain.Game, error)
	// TODO: Добавить другие методы (List, Update, Delete)
}