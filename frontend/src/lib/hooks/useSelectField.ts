import { useState, useCallback } from 'react';

interface SelectFieldState<T> {
    value: T[];
    error: string | null;
    touched: boolean;
}

interface UseSelectFieldReturn<T> {
    inputState: SelectFieldState<T>;
    setValue: (value: T[]) => void;
    setError: (error: string | null) => void;
    setTouched: (touched: boolean) => void;
    clearField: () => void;
}

export function useSelectField<T> (initialValue: T[] = []): UseSelectFieldReturn<T> {

    const [inputState, setInputState] = useState<SelectFieldState<T>>({
        value: initialValue,
        error: null,
        touched: false,
    });

    const setValue = useCallback((value: T[]) => {
        setInputState(prev => ({
            ...prev,
            value,
            error: null,
        }));
    }, []);

    const setError = useCallback((error: string | null) => {
        setInputState(prev => ({
            ...prev,
            error,
        }));
    }, []);

    const setTouched = useCallback((touched: boolean) => {
        setInputState(prev => ({
            ...prev,
            touched,
        }));
    }, []);

    const clearField = useCallback(() => {
        setInputState({
            value: [],
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



