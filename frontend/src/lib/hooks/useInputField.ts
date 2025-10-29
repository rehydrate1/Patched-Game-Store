import { useState, useCallback } from 'react';

interface InputFieldState {
    value: string;
    error: string | null;
    touched: boolean;
}

interface UseInputFieldReturn {
    inputState: InputFieldState;
    setValue: (value: string) => void;
    setError: (error: string | null) => void;
    setTouched: (touched: boolean) => void;
    clearField: () => void;
}

export function useInputField (initialValue: string = ''): UseInputFieldReturn {

    const [inputState, setInputState] = useState<InputFieldState>({
        value: initialValue,
        error: null,
        touched: false,
    });

    // Устанавливаем значение поля
    const setValue = useCallback((value: string) => {
        setInputState(prev => ({
            ...prev,
            value,
            error: null, // Сбрасываем ошибку при изменении значения
        }));
    }, []);

    // Устанавливаем ошибку поля
    const setError = useCallback((error: string | null) => {
        setInputState(prev => ({
            ...prev,
            error,
        }));
    }, []);

    // Отмечаем поле как "тронутое" пользователем
    const setTouched = useCallback((touched: boolean) => {
        setInputState(prev => ({
            ...prev,
            touched,
        }));
    }, []);

    // Очищаем поле
    const clearField = useCallback(() => {
        setInputState({
            value: '',
            error: null,
            touched: false,
        });
    }, []);

    return {
        inputState,
        setValue,
        setError,
        setTouched,
        clearField,
    };
}