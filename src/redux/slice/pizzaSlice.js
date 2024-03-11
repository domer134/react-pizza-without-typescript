import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async params => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get(
			`https://641461e09172235b8693396d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

const initialState = {
	items: [],
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			console.log('Триває відправка')
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			console.log(state, 'Все норм')
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log('Помилка')
		},
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
