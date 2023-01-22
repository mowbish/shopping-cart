import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	itemIdList: [],
}

export const compare = createSlice({
	name: "compare",
	initialState,
	reducers: {
		addItem: (state, action) => ({
			...state,
			itemIdList: [...state.itemIdList, action.payload],
		}),
		removeItem: (state, action) => {
			const newList = []
			state.itemIdList.forEach((element) => {
				if (element !== action.payload) newList.push(element)
			})

			return {
				...state,
				itemIdList: newList,
			}
		},
	},
})

export const { addItem, removeItem } = compare.actions
export default compare.reducer
