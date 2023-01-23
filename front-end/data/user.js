import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	account: {
		username: undefined,
		first_name: undefined,
		last_name: undefined,
		email: undefined,
		password: undefined,
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
		setUsername: (state, action) => ({
			...state,
			account: { ...state.account, username: action.payload },
		}),
		setFirstName: (state, action) => ({
			...state,
			account: { ...state.account, first_name: action.payload },
		}),
		setLastname: (state, action) => ({
			...state,
			account: { ...state.account, last_name: action.payload },
		}),
		setEmail: (state, action) => ({
			...state,
			account: { ...state.account, email: action.payload },
		}),
		setPassword: (state, action) => ({
			...state,
			account: { ...state.account, password: action.payload },
		}),
		addAddress: (state, action) => {
			let canAdd = true

			state.address.forEach((address) => {
				if (address.postal_code == action.payload[0].postal_code) canAdd = false
			})

			if (canAdd)
				return {
					...state,
					address: [...state.address, ...action.payload],
				}
		},
		removeAddress: (state, action) => {
			let addressArray = []

			state.address.forEach((address) => {
				if (address.postal_code !== action.payload) addressArray.push(address)
			})

			return { ...state, address: addressArray }
		},
	},
})

export const {
	setUsername,
	setFirstName,
	setLastname,
	setEmail,
	setPassword,
	addAddress,
	removeAddress,
} = user.actions
export default user.reducer
