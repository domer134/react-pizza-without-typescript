import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import cart from './slice/cartSlice'
import pizza from './slice/pizzaSlice'

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizza,
	},
})
