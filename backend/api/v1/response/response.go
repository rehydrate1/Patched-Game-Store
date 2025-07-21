package response

import (
	"encoding/json"
	"net/http"
)

// Структура успешных ответов
type SuccessResponse struct {
	Status string `json:"status"`
	Data   any    `json:"data"`
}

// Структура ошибочных ответов
type ErrorResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// Отправляет стандартизированный успешный JSON-ответ
func JSON(w http.ResponseWriter, statusCode int, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(statusCode)

	resp := SuccessResponse{
		Status: "success",
		Data:   data,
	}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		// логирование
	}
}

// Отправляет стандартизированный ошибочный JSON-ответ
func Error(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(statusCode)

	resp := ErrorResponse{
		Status:  "error",
		Message: message,
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		// логирование
	}
}
