import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	theme: undefined,
}

export const window = createSlice({
	name: "window",
	initialState,
	reducers: {
		setTheme: (state, action) => ({ ...state, theme: action.payload }),
	},
})

export const { setTheme } = window.actions
export default window.reducer
