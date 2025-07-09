import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Описываем тип для одного товара в корзине
export interface CartItem {
    id: number;
    name: string;
    price: string;
    picture: string;
    quantity: number;
}

// Описываем тип для всего состояния корзины
interface CartState {
    items: CartItem[];
}

// Начальное состояние
const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart', // Имя среза
    initialState,
    // Редьюсеры - функции, которые описывают, как меняется состояние
    reducers: {

        hydrate(state, action: PayloadAction<CartState>) {
            // Заменяем все состояние среза на то, что пришло
            return action.payload;
        },

        // action для добавления товара
        addItem(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
        },
        // action для удаления товара
        removeItem(state, action: PayloadAction<number>) {
            const idToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== idToRemove);
        },
        // action для полной очистки
        clearCart(state) {
            state.items = [];
        }
        // Можно добавить increment/decrement и другие...
    },
});

// Экспортируем actions для использования в компонентах
export const { hydrate, addItem, removeItem, clearCart } = cartSlice.actions;

// Экспортируем редьюсер для добавления в store
export default cartSlice.reducer;