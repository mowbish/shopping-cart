import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	status: "home",
	theme: undefined,
	width: undefined,
	height: undefined,
}

export const pageStatus = createSlice({
	name: "pageStatus",
	initialState,
	reducers: {
		setState: (state, action) => ({ ...state, status: action.payload }),
		setTheme: (state, action) => ({ ...state, theme: action.payload }),
		setWidth: (state, action) => ({ ...state, width: action.payload }),
		setHeight: (state, action) => ({ ...state, height: action.payload }),
	},
})

export const { setState, setTheme, setWidth, setHeight } = pageStatus.actions
export default pageStatus.reducer
