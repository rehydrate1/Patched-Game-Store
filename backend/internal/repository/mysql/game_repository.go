package mysql

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/rehydrate1/Patched-Game-Store/internal/domain"
	"github.com/rehydrate1/Patched-Game-Store/internal/repository"
)

// Реализует интерфейс GameRepository для работы с MySQL
type gameRepository struct {
	db *sql.DB
}

// Создаёт новый экземпляр репозиторя для MySQL
func NewGameRepository(db *sql.DB) repository.GameRepository {
	return &gameRepository{
		db: db,
	}
}

// Создаёт новую игру в базе данных
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

// Извелекает одну игру по её ID
func (r *gameRepository) GetByID(ctx context.Context, id string) (*domain.Game, error) {
	tx, err := r.db.BeginTx(ctx, &sql.TxOptions{ReadOnly: true})
	if err != nil {
		return nil, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback()
	
	query := `SELECT id, title, description, price, release_date, cover_image_url, developer, publisher, created_at, updated_at FROM games WHERE id = ?`
	row := r.db.QueryRowContext(ctx, query, id)

	var game domain.Game
	var releaseDate sql.NullTime

	err = row.Scan(
		&game.ID,
		&game.Title,
		&game.Description,
		&game.Price,
		&releaseDate,
		&game.CoverImageURL,
		&game.Developer,
		&game.Publisher,
		&game.CreatedAt,
		&game.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get game by id: %w", err)
	}

	if releaseDate.Valid {
		game.ReleaseDate = releaseDate.Time
	}

	querySysReqs := `SELECT os_min, processor_min, memory_min, graphics_min, storage_min, os_rec, processor_rec, memory_rec, graphics_rec, storage_rec
                     FROM system_requirements WHERE game_id = ?`
	rowSysReqs := tx.QueryRowContext(ctx, querySysReqs, id)
	err = rowSysReqs.Scan(
		&game.MinSystemReqs.OS, &game.MinSystemReqs.Processor, &game.MinSystemReqs.Memory, &game.MinSystemReqs.Graphics, &game.MinSystemReqs.Storage,
		&game.RecSystemReqs.OS, &game.RecSystemReqs.Processor, &game.RecSystemReqs.Memory, &game.RecSystemReqs.Graphics, &game.RecSystemReqs.Storage,
	)
	if err != nil && err != sql.ErrNoRows {
		return nil, fmt.Errorf("failed to get system requirements: %w", err)
	}

	game.Genres, err = r.getGenresForGame(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	game.Platforms, err = r.getPlatformsForGame(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	game.Applications, err = r.getApplicationsForGame(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	game.Gallery, err = r.getGalleryForGame(ctx, tx, id)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}
	return &game, nil
}

func (r *gameRepository) getGenresForGame(ctx context.Context, tx *sql.Tx, gameID string) ([]domain.Genre, error) {
	query := `SELECT g.id, g.name FROM genres g
              INNER JOIN game_genres gg ON g.id = gg.genre_id
              WHERE gg.game_id = ?`
	rows, err := tx.QueryContext(ctx, query, gameID)
	if err != nil {
		return nil, fmt.Errorf("failed to query genres for game: %w", err)
	}
	defer rows.Close()

	var genres []domain.Genre
	for rows.Next() {
		var genre domain.Genre
		if err := rows.Scan(&genre.ID, &genre.Name); err != nil {
			return nil, fmt.Errorf("failed to scan genre: %w", err)
		}
		genres = append(genres, genre)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error in genres: %w", err)
	}
	return genres, nil
}

func (r *gameRepository) getPlatformsForGame(ctx context.Context, tx *sql.Tx, gameID string) ([]domain.Platform, error) {
	query := `SELECT p.id, p.name FROM platforms p
              INNER JOIN game_platforms gp ON p.id = gp.platform_id
              WHERE gp.game_id = ?`
	rows, err := tx.QueryContext(ctx, query, gameID)
	if err != nil {
		return nil, fmt.Errorf("failed to query platforms for game: %w", err)
	}
	defer rows.Close()

	var platforms []domain.Platform
	for rows.Next() {
		var platform domain.Platform
		if err := rows.Scan(&platform.ID, &platform.Name); err != nil {
			return nil, fmt.Errorf("failed to scan platform: %w", err)
		}
		platforms = append(platforms, platform)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error in platforms: %w", err)
	}
	return platforms, nil
}

func (r *gameRepository) getApplicationsForGame(ctx context.Context, tx *sql.Tx, gameID string) ([]domain.Application, error) {
	query := `SELECT a.id, a.name FROM applications a
              INNER JOIN game_applications ga ON a.id = ga.application_id
              WHERE ga.game_id = ?`
	rows, err := tx.QueryContext(ctx, query, gameID)
	if err != nil {
		return nil, fmt.Errorf("failed to query applications for game: %w", err)
	}
	defer rows.Close()

	var applications []domain.Application
	for rows.Next() {
		var application domain.Application
		if err := rows.Scan(&application.ID, &application.Name); err != nil {
			return nil, fmt.Errorf("failed to scan application: %w", err)
		}
		applications = append(applications, application)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error in applications: %w", err)
	}
	return applications, nil
}

func (r *gameRepository) getGalleryForGame(ctx context.Context, tx *sql.Tx, gameID string) ([]domain.GalleryImage, error) {
	query := `SELECT id, image_url, capture FROM game_gallery_images
              WHERE game_id = ?`
	rows, err := tx.QueryContext(ctx, query, gameID)
	if err != nil {
		return nil, fmt.Errorf("failed to query images for game: %w", err)
	}
	defer rows.Close()

	var images []domain.GalleryImage
	for rows.Next() {
		var image domain.GalleryImage
		if err := rows.Scan(&image.ID, &image.URL, &image.Caption); err != nil {
			return nil, fmt.Errorf("failed to scan image: %w", err)
		}
		images = append(images, image)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error in images: %w", err)
	}
	return images, nil
}