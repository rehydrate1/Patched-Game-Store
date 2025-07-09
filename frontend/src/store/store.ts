import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { hydrate } from './slices/cartSlice';
import { localStorageMiddleware } from './middleware/localStorage';

// Функция для загрузки начального состояния
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined; 
        }
        return { cart: JSON.parse(serializedState) }; // Возвращаем в формате всего store
    } catch (err) {
        return undefined;
    }
};

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        // Подключаем наш middleware
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
        // Устанавливаем начальное состояние из localStorage
        preloadedState: loadState(),
    });
};

// Типы остаются теми же
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];