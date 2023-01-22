import Link from "next/link"
import addAddress from "../../components/addAddress"
import Input from "../../components/input"

export default function Login() {
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
		</>
	)
}
