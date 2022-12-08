import { createSlice } from "@reduxjs/toolkit"

const initialState = { status: "home", theme: undefined }

export const pageStatus = createSlice({
	name: "pageStatus",
	initialState,
	reducers: {
		setState: (state, action) => ({ ...state, status: action.payload }),
		setTheme: (state, action) => ({ ...state, theme: action.payload }),
	},
})

export const { setState, setTheme } = pageStatus.actions
export default pageStatus.reducer
