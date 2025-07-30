package service

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	"github.com/rehydrate1/Patched-Game-Store/internal/repository"
	"github.com/rs/zerolog"
)

// Определяет интерфейс для бизнес-логикиб связанной с играми
type GameService interface {
	Create(ctx context.Context, input domain.CreateGameRequest) (*domain.Game, error)
	GetByID(ctx context.Context, id string) (*domain.Game, error)
}

// Реализация GameService
type gameService struct {
	repo   repository.GameRepository
	logger *zerolog.Logger
}

// Создаёт новый экземпляр сервиса игр
func NewGameService(repo repository.GameRepository, logger *zerolog.Logger) GameService {
	return &gameService{
		repo:   repo,
		logger: logger,
	}
}

// Выполняет бизнес-логику по созданию игры
func (s *gameService) Create(ctx context.Context, input domain.CreateGameRequest) (*domain.Game, error) {
	s.logger.Info().Str("title", input.Title).Msg("Service: creating game")
	releaseDate, err := time.Parse("2006-01-02", input.ReleaseDate)
	if err != nil {
		s.logger.Warn().Err(err).Str("release_date", input.ReleaseDate).Msg("Failed to parse release date")
	}

	newGame := &domain.Game{
		ID:            uuid.New().String(),
		Title:         input.Title,
		Description:   input.Description,
		Price:         input.Price,
		ReleaseDate:   releaseDate, // пока так
		CoverImageURL: input.CoverImageURL,
		Developer:     input.Developer,
		Publisher:     input.Publisher,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	for _, id := range input.GenreIDs {
		newGame.Genres = append(newGame.Genres, domain.Genre{ID: id})
	}

	for _, id := range input.PlatformIDs {
		newGame.Platforms = append(newGame.Platforms, domain.Platform{ID: id})
	}

	for _, id := range input.ApplicationIDs {
		newGame.Applications = append(newGame.Applications, domain.Application{ID: id})
	}

	for _, url := range input.GalleryImageURLs {
		newGame.Gallery = append(newGame.Gallery, domain.GalleryImage{URL: url})
	}

	err = s.repo.Create(ctx, newGame)
	if err != nil {
		s.logger.Error().Err(err).Msg("Service: failed to create game in repository")
		return nil, err
	}
	return newGame, nil
}

// Выполняет бизнес-логику по получению игры
func (s *gameService) GetByID(ctx context.Context, id string) (*domain.Game, error) {
	s.logger.Info().Str("id", id).Msg("Service: getting game by id")

	game, err := s.repo.GetByID(ctx, id)
	if err != nil {
		s.logger.Error().Err(err).Msg("Service: failed to get game by id from repository")
		return nil, err
	}

	if game == nil {
		return nil, ErrNotFound
	}
	return game, nil
}
