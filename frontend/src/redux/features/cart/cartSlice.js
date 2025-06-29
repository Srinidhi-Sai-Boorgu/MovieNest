import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    title: "Already in cart",
                    text: `${action.payload.title} is already in your cart`,
                    icon: "info"
                });
            }
        },
        removeFromCart: (state, action) => { 
            const updatedCartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            state.cartItems = updatedCartItems;
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product removed from cart",
                showConfirmButton: false,
                timer: 1500
            });
        },
        clearCart: (state) => {
            state.cartItems = [];
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cart cleared",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;