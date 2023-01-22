export default function Input({
	label,
	placeHolder,
	name,
	type = "text",
	required = false,
}) {
	let temp = (
		<label htmlFor={name}>
			<b>{label}</b>
		</label>
	)

	if (required == false)
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
				<input type={type} placeholder={placeHolder} name={name} required />
			</>
		)
}
