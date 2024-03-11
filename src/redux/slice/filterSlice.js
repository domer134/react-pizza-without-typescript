import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярність',
		sortProperty: 'rating',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoreyId(state, action) {
			state.categoryId = action.payload
		},
		setSort(state, action) {
			state.sort = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilter(state, action) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING_DESC,
				}
			}
		},
	},
})

export const { setCategoreyId, setSort, setCurrentPage, setFilter } =
	filterSlice.actions

export default filterSlice.reducer
