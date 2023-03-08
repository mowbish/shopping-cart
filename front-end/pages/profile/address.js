import { createElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAddressApi, addAddressApi, removeAddressApi, updateAddressApi } from "../../functions/address"
import { setAddressDb, addAddressDb, removeAddressDb, updateAddressDb } from "../../data/user"

import AddressComp from "../../components/profile/address/address"
import Address from "../../components/misc/address"

export default function AddressPage() {
	const addressList = useSelector((store) => store.user.address)
	const addressFlag = useSelector((store) => store.user.addressFlag)
	const database = useDispatch()
	const [addressUi, setAddressUi] = useState()
	let addressUniqueIndex = 0

	// get address list on first load
	useEffect(() => {
		async function temp() {
			if (addressFlag) return

			const result = await getAddressApi()
			if (result == false) return
			else database(setAddressDb(result))
		}
		temp()
	}, [])
	// edit ui every time that address list changes
	useEffect(() => {
		const tempList = addressList.map((data) => (
			<div>
				<br />
				<br />
				<br />
				<Address data={data} key={++addressUniqueIndex} />
				<button onClick={deleteAddress}>remove</button>
				<button onClick={editAddress}>edit</button>
			</div>
		))
		setAddressUi(tempList)
	}, [addressList])

	async function addAddressHandler(event) {
		event.preventDefault()
		const { address_name, country, state, city, address_detail, postal_code } = event.target.parentElement.children
		const dataObj = {
			address_name: address_name.value,
			country: country.value,
			state: state.value,
			city: city.value,
			address_detail: address_detail.value,
			postal_code: postal_code.value,
		}

		const result = await addAddressApi(dataObj)

		if (result) database(addAddressDb(dataObj))
	}

	async function deleteAddress(event) {
		event.preventDefault()
		const postal_code = event.target.parentElement.children[3].children[4].children[1].getAttribute("value")

		const result = await removeAddressApi(postal_code)

		if (result) database(removeAddressDb(postal_code))
	}

	let postal_code
	async function editAddress(event) {
		event.preventDefault()
		const address = event.target.parentElement.children[3].children

		if (event.target.innerHTML === "edit") {
			postal_code = event.target.parentElement.children[3].children[4].children[1].getAttribute("value")

			for (const part of address) {
				const value = part.children[1].getAttribute("value")
				const name = part.children[1].getAttribute("name")

				const input = document.createElement("input")

				input.setAttribute("value", value)
				input.setAttribute("name", name)

				input.oninput = (e) => input.setAttribute("value", e.target.value)

				part.children[1].replaceWith(input)
			}
		} else {
			const data = {}

			for (const part of address) {
				const name = part.children[1].getAttribute("name")
				const value = part.children[1].getAttribute("value")

				data[name] = value
			}

			updateAddressApi(postal_code, data)
			database(updateAddressDb({ postal_code, data }))

			for (const part of address) {
				const value = part.children[1].getAttribute("value")
				const name = part.children[1].getAttribute("name")

				const input = document.createElement("input")

				input.setAttribute("value", value)
				input.setAttribute("name", name)
				input.setAttribute("readonly", true)

				input.oninput = (e) => input.setAttribute("value", e.target.value)

				part.children[1].replaceWith(input)
			}
		}

		event.target.innerHTML = event.target.innerHTML === "edit" ? "Upload" : "edit"
	}

	return <AddressComp addAddressHandler={addAddressHandler} addressUi={addressUi} />
}
