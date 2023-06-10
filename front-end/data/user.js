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
	addressFlag: false,
}

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAccountDb: (state, action) => ({ ...state, account: action.payload }),
		setAddressDb: (state, action) => ({ ...state, address: action.payload, addressFlag: true }),
		addAddressDb: (state, action) => {
			const exist = checkAddressExistence(state.address, action.payload)

			if (exist) {
				alert("this postal code already exist in the front database")
				return { ...state }
			} else return { ...state, address: [...state.address, action.payload] }
		},
		removeAddressDb: (state, action) => {
			const exist = checkAddressExistence(state.address, action.payload)

			if (!exist) {
				alert("this postal code doesnt exist in the front database")
				return { ...state }
			} else {
				const addressList = state.address.filter((address) => {
					if (address.postal_code !== action.payload) return address
				})

				return { ...state, address: addressList }
			}
		},
		updateAddressDb: (state, action) => {
			const addressList = state.address.map((address) => {
				if (address.postal_code === action.payload.postal_code) return action.payload.data
				else return address
			})

			return { ...state, address: addressList }
		},
	},
})

export const { setAccountDb, setAddressDb, addAddressDb, removeAddressDb, updateAddressDb } = user.actions
export default user.reducer

export function checkAddressExistence(database, postalCode) {
	let whatToReturn = false

	database.forEach((data) => {
		if (data.postal_code === postalCode) whatToReturn = true
	})

	return whatToReturn
}
