package domain

import "time"

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
	Geners        []string  `json:"genres,omitempty"`
	Platforms     []string  `json:"platforms,omitempty"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

// Структура для запроса на создание игры
type CreateGameRequest struct {
	Title         string   `json:"title" validate:"required,min=3,max=100"`
	Description   string   `json:"description" validate:"required,min=10"`
	Price         float64  `json:"price" validate:"required,gt=0"`
	ReleaseDate   string   `json:"releaseDate" validate:"required,datetime=2006-01-02"`
	CoverImageURL string   `json:"coverImageUrl" validate:"omitempty,url"`
	Developer     string   `json:"developer,omitempty"`
	Publisher     string   `json:"publisher,omitempty"`
	Geners        []string `json:"genres,omitempty"`
	Platforms     []string `json:"platforms,omitempty"`
}
