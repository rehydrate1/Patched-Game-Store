package mysql

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	"github.com/rehydrate1/Patched-Game-Store/internal/repository"
)


type gameRepository struct {
	db *sql.DB
}

func NewGameRepository(db *sql.DB) repository.GameRepository {
	return &gameRepository{
		db: db,
	}
}


func (r *gameRepository) Create(ctx context.Context, game *domain.Game) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()

	queryGames := `INSERT INTO games (id, title, description, price, release_date, cover_image_url, developer, publisher, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err = tx.ExecContext(ctx, queryGames, game.ID, game.Title, game.Description, game.Price, game.ReleaseDate, game.CoverImageURL, game.Developer, game.Publisher, game.CreatedAt, game.UpdatedAt)
	if err != nil {
		return fmt.Errorf("failed to insert into games: %w", err)
	}

	querySysRegs := `INSERT INTO system_requirements (game_id, os_min, processor_min, memory_min, graphics_min, storage_min, os_rec, processor_rec, memory_rec, graphics_rec, storage_rec) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	_, err = tx.ExecContext(ctx, querySysRegs, game.ID, game.MinSystemReqs.OS, game.MinSystemReqs.Processor, game.MinSystemReqs.Memory, game.MinSystemReqs.Graphics, game.MinSystemReqs.Storage,
		game.RecSystemReqs.OS, game.RecSystemReqs.Processor, game.RecSystemReqs.Memory, game.RecSystemReqs.Graphics, game.RecSystemReqs.Storage)
	if err != nil {
		return fmt.Errorf("failed to insert into system_requirements: %w", err)
	}

	if len(game.Genres) > 0 {
		queryGameGenres := "INSERT INTO game_genres (game_id, genre_id) VALUES (?, ?)"
		for _, genre := range game.Genres {
			_, err := tx.ExecContext(ctx, queryGameGenres, game.ID, genre.ID)
			if err != nil {
				return fmt.Errorf("failed to insert into game_genres: %w", err)
			}

		}
	}

	if len(game.Platforms) > 0 {
		queryGamePlatforms := "INSERT INTO game_platforms (game_id, platform_id) VALUES (?, ?)"
		for _, platform := range game.Platforms {
			_, err := tx.ExecContext(ctx, queryGamePlatforms, game.ID, platform.ID)
			if err != nil {
				return fmt.Errorf("failed to insert into game_platforms: %w", err)
			}

		}
	}

	if len(game.Applications) > 0 {
		queryGameApplications := "INSERT INTO game_applications (game_id, application_id) VALUES (?, ?)"
		for _, application := range game.Applications {
			_, err := tx.ExecContext(ctx, queryGameApplications, game.ID, application.ID)
			if err != nil {
				return fmt.Errorf("failed to insert into game_applications: %w", err)
			}

		}
	}

	if len(game.Gallery) > 0 {
		queryGallery := "INSERT INTO game_gallery_images (game_id, image_url, caption) VALUES (?, ?, ?)"
		for _, image := range game.Gallery {
			_, err := tx.ExecContext(ctx, queryGallery, game.ID, image.URL, image.Caption)
			if err != nil {
				return fmt.Errorf("failed to insert into game_gallery_images: %w", err)
			}
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}


func (r *gameRepository) GetByID(ctx context.Context, id string) (*domain.Game, error) {
	
	return nil, nil
}
