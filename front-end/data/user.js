import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	account: {
		username: undefined,
		first_name: undefined,
		last_name: undefined,
		email: undefined,
	},
	address: [
		// {
		// 	address_name,
		// 	country,
		// 	state,
		// 	city,
		// 	address_detail,
		// 	postal_code,
		// },
	],
}

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAccount: (state, action) => ({ ...state, account: action.payload }),
		addAddress: (state, action) => ({ ...state, address: [...state.address, action.payload] }),
		removeAddress: (state, action) => {
			let addressArray = []

			state.address.forEach((address) => {
				if (address.postal_code !== action.payload) addressArray.push(address)
			})

			return { ...state, address: addressArray }
		},
	},
})

export const { setAccount, addAddress, removeAddress } = user.actions
export default user.reducer
