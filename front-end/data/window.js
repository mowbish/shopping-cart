import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: "home",
	theme: undefined,
	width: undefined,
	height: undefined,
}

export const window = createSlice({
	name: "window",
	initialState,
	reducers: {
		setState: (state, action) => ({ ...state, status: action.payload }),
		setTheme: (state, action) => ({ ...state, theme: action.payload }),
		setWidth: (state, action) => ({ ...state, width: action.payload }),
		setHeight: (state, action) => ({ ...state, height: action.payload }),
	},
})

export const { setState, setTheme, setWidth, setHeight } = window.actions
export default window.reducer
