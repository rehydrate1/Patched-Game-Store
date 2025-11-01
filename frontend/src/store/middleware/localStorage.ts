import { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const localStorageMiddleware: Middleware = store => next => (action) => {
    // Сначала даем action дойти до reducer и обновить state
    const result = next(action);

    // После обновления state, если action относится к корзине, сохраняем
    const actionType = (action as { type?: unknown }).type;
    if (typeof actionType === 'string' && actionType.startsWith('cart/')) {
        const cartState = (store.getState() as RootState).cart;
        try {
            localStorage.setItem('cart', JSON.stringify(cartState));
        } catch (e) {
            console.error("Could not save cart to localStorage", e);
        }
    }

    return result;
};