package service

import "errors"

// Кастомные ошибки
var (
	ErrNotFound      = errors.New("requested item not found")
	ErrAlreadyExists = errors.New("item already exists")
	ErrValidation    = errors.New("validation failed")
	// добавить ещё
)
