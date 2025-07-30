package domain

import "time"

type Genre struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Platform struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Application struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// Одно изображение из галереи игры.
type GalleryImage struct {
	ID        int    `json:"id"`
	URL       string `json:"url"`
	Caption   string `json:"caption,omitempty"`
}

type SystemRequirements struct {
	OS        string `json:"os,omitempty"`
	Processor string `json:"processor,omitempty"`
	Memory    string `json:"memory,omitempty"`
	Graphics  string `json:"graphics,omitempty"`
	Storage   string `json:"storage,omitempty"`
}

// Сущность игры
type Game struct {
	ID            string    `json:"id"`
	Title         string    `json:"title"`
	Description   string    `json:"description"`
	Price         float64   `json:"price"`
	ReleaseDate   time.Time `json:"releaseDate"`
	CoverImageURL string    `json:"coverImageUrl"`
	Developer     string    `json:"developer,omitempty"`
	Publisher     string    `json:"publisher,omitempty"`
	Genres             []Genre            `json:"genres,omitempty"`
	Platforms          []Platform         `json:"platforms,omitempty"`
	Applications       []Application      `json:"applications,omitempty"`
	Gallery            []GalleryImage     `json:"gallery,omitempty"`
	MinSystemReqs      SystemRequirements `json:"minSystemReqs,omitempty"`
	RecSystemReqs      SystemRequirements `json:"recSystemReqs,omitempty"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

// Структура для запроса на создание игры
type CreateGameRequest struct {
	Title              string             `json:"title" validate:"required"`
	Description        string             `json:"description"`
	Price              float64            `json:"price" validate:"required,gt=0"`
	ReleaseDate        string             `json:"releaseDate" validate:"required,datetime=2006-01-02"`
	CoverImageURL      string             `json:"coverImageUrl" validate:"omitempty,url"`
	Developer          string             `json:"developer,omitempty"`
	Publisher          string             `json:"publisher,omitempty"`
	GenreIDs           []int              `json:"genreIds,omitempty"`
	PlatformIDs        []int              `json:"platformIds,omitempty"`
	ApplicationIDs     []int              `json:"applicationIds,omitempty"`
	GalleryImageURLs   []string           `json:"galleryImageUrls,omitempty"`
	MinSystemReqs      SystemRequirements `json:"minSystemReqs,omitempty"`
	RecSystemReqs      SystemRequirements `json:"recSystemReqs,omitempty"`
}

// Структура для запроса на обновление игры
type UpdateGameRequest struct {
	Title              *string             `json:"title,omitempty"`
	Description        *string             `json:"description,omitempty"`
	Price              *float64            `json:"price,omitempty"`
	ReleaseDate        *string             `json:"releaseDate,omitempty"`
	CoverImageURL      *string             `json:"coverImageUrl,omitempty"`
	Developer          *string             `json:"developer,omitempty"`
	Publisher          *string             `json:"publisher,omitempty"`
	GenreIDs           []int               `json:"genreIds,omitempty"`
	PlatformIDs        []int               `json:"platformIds,omitempty"`
	ApplicationIDs     []int               `json:"applicationIds,omitempty"`
}
