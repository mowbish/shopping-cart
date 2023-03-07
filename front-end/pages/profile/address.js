import Input from "../../components/input"
import { useEffect, useState } from "react"
import {
	getAddress as getAddressApi,
	addAddress as addAddressApi,
	removeAddress as removeAddressApi,
} from "../../functions/api/address"
import { useDispatch, useSelector } from "react-redux"
import { addAddress as addAddressToDb, removeAddress as removeAddressDb } from "../../data/user"

export default function Address() {
	const addressList = useSelector((store) => store.user.address)
	const database = useDispatch()
	const [addressUi, setAddressUi] = useState()

	function renderAddresses() {
		let id = 1

		return (
			<div>
				{addressList.map((address) => (
					<div>
						{["address_name", "country", "state", "city", "address_detail", "postal_code"].map((key) => (
							<>
								<Input
									label={key}
									type="text"
									name={key}
									value={address[key]}
									required="required"
									placeHolder={key}
									key={`address-input-${id++}`}
								/>
								<br />
							</>
						))}
						<button onClick={deleteAddress}>delete this one</button>
						<br />
						<br />
						<br />
						<br />
						<br />
					</div>
				))}
			</div>
		)
	}

	//get user list on first load
	useEffect(() => {
		async function temp() {
			const data = await getAddressApi()
			database(addAddressToDb(data))
			setAddressUi(renderAddresses())
		}
		temp()
	}, [])

	useEffect(() => {
		setAddressUi(renderAddresses())
	}, [addressList])

	function deleteAddress(event) {
		event.preventDefault()
		const { postal_code } = event.target.parentElement.children

		removeAddressApi(postal_code.value)

		database(removeAddressDb(postal_code.value))
		// event.target.parentElement.remove()
	}

	async function addAddressHandler(event) {
		event.preventDefault()
		const { address_name, country, state, city, address_detail, postal_code } = event.target.parentElement.children

		let isExist = false
		addressList.forEach((address) => {
			if (address.postal_code === postal_code.value) isExist = true
		})

		if (isExist) alert("Address with this postal_code already exists.")
		else {
			const result = await addAddressApi(
				address_name.value,
				country.value,
				state.value,
				city.value,
				address_detail.value,
				postal_code.value
			)

			console.log(result)

			if (result)
				database(
					addAddressToDb({
						address_name: address_name.value,
						country: country.value,
						state: state.value,
						city: city.value,
						address_detail: address_detail.value,
						postal_code: postal_code.value,
					})
				)
		}
	}

	return (
		<>
			<form>
				{["address_name", "country", "state", "city", "address_detail", "postal_code"].map((key) => (
					<>
						<Input label={key} name={key} placeHolder={key} required={key === "country" && false} />
						<br />
					</>
				))}
				<button type="submit" onClick={addAddressHandler}>
					add address
				</button>
			</form>
			<br />
			<br />
			<br />
			{addressUi}
		</>
	)
}
