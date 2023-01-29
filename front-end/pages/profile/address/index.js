import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAddress, removeAddress } from "../../../data/user"
import AddAddress from "../../../functions/profile/addAddress"
import Input from "../../../components/input"

export default function Address() {
	const dispatch = useDispatch()
	const user = useSelector((store) => store.user)
	const inputData = [
		{
			label: "address_name",
			placeHolder: "address_name",
			name: "address_name",
			type: "text",
			required: "required",
		},
		{
			label: "country",
			placeHolder: "country",
			name: "country",
			type: "text",
		},
		{
			label: "state",
			placeHolder: "state",
			name: "state",
			type: "text",
			required: "required",
		},
		{
			label: "city",
			placeHolder: "city",
			name: "city",
			type: "text",
			required: "required",
		},
		{
			label: "address_detail",
			placeHolder: "address_detail",
			name: "address_detail",
			type: "text",
			required: "required",
		},
		{
			label: "postal_code",
			placeHolder: "postal_code",
			name: "postal_code",
			type: "password",
			required: "required",
		},
	]

	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		addAddress(
			list.address_name.value,
			list.country.value,
			list.state.value,
			list.city.value,
			list.address_detail.value,
			list.postal_code.value
		)
	}
	useEffect(() => {
		// fetch data
		let root = window.location.origin
		if (process.env.NODE_ENV !== "production")
			root = window.location.origin.replace("3", "8")
		fetch(`${root}/api/user-address/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"),
			},
		})
			.then((res) => {
				if (res.ok) return res.json()
			})
			.then((data) => dispatch(AddAddress(data)))
			.catch((err) => console.error(err))
	}, [])

	const clickHandler = (event) => {
		//remove from ui
		const postalCode = event.target.parentElement.children[1].children[11].innerHTML
		dispatch(removeAddress(postalCode))
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				{inputData.map((input) => (
					<>
						<Input
							label={input.label}
							placeHolder={input.placeHolder}
							name={input.name}
							type={input.type}
							required={input.required}
						/>
						<br />
					</>
				))}
				<button type="submit">add address</button>
			</form>
			<br />
			<br />
			<br />
			<ul>
				{user.address.map((address) => (
					<>
						<button onClick={clickHandler}>Delete</button>
						<li>
							<p>address_name</p>
							<h6>{address.address_name}</h6>
							<p>country</p>
							<h6>{address.country}</h6>
							<p>state</p>
							<h6>{address.state}</h6>
							<p>city</p>
							<h6>{address.city}</h6>
							<p>address_detail</p>
							<h6>{address.address_detail}</h6>
							<p>postal_code</p>
							<h6>{address.postal_code}</h6>
						</li>
					</>
				))}
			</ul>
		</>
	)
}
