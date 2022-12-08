import { createSlice } from "@reduxjs/toolkit"

const initialState = { status: "home" }

export const pageStatus = createSlice({
	name: "pageStatus",
	initialState,
	reducers: {
		setState: (state, action) => ({ ...state, status: action.payload }),
	},
})

export const { setState } = pageStatus.actions
export default pageStatus.reducer
