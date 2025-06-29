import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import moviesApi from './features/movies/moviesApi'
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, ordersApi.middleware),
})