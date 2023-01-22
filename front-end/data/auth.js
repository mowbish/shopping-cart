import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	signed: undefined,
	token: undefined,
	refresh: undefined,
}

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSigned: (state, action) => ({ ...state, status: action.payload }),
		setToken: (state, action) => ({ ...state, theme: action.payload }),
		setRefresh: (state, action) => ({ ...state, width: action.payload }),
	},
})

export const { setSigned, setToken, setRefresh } = auth.actions
export default auth.reducer
