import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addNewProduct: (state, action) => {
            state.products.push(action.payload),
            state.quantity += 1,
            state.total += action.payload.price * action.payload.quantity
        },
        reset: (state) => {
            state = initialState
        },
    },
})

export const { addNewProduct, reset } = cartSlice.actions
export default cartSlice.reducer