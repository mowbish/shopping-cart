export default function Input({ label, placeHolder, name, type = "text", required = false, value = false }) {
	let temp = (
		<label htmlFor={name}>
			<b>{label}</b>
		</label>
	)

	if (required == false) {
		if (value == false)
			return (
				<>
					{temp}
					<input type={type} placeholder={placeHolder} name={name} />
				</>
			)
		else
			return (
				<>
					{temp}
					<input type={type} placeholder={placeHolder} name={name} defaultValue={value} />
				</>
			)
	} else {
		if (value == false)
			return (
				<>
					{temp}
					<input type={type} placeholder={placeHolder} name={name} required />
				</>
			)
		else
			return (
				<>
					{temp}
					<input type={type} placeholder={placeHolder} name={name} defaultValue={value} required />
				</>
			)
	}
}
