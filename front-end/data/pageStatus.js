import { createSlice } from "@reduxjs/toolkit"

const initialState = { state: 0 }

export const pageStatus = createSlice({
	name: "pageStatus",
	initialState,
	reducers: {
		setState: (state, action) => ({ ...state, state: action.payload }),
	},
})

export const { setState } = pageStatus.actions
export default pageStatus.reducer
