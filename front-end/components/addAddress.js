import lengthCheck from "./lengthCheck"

export default function AddAddress(
	address_name,
	country,
	state,
	city,
	address_detail,
	postal_code
) {
	if (lengthCheck(address_name, "address_name", 1, 30)) return
	if (lengthCheck(country, "country", 0, 30)) return
	if (lengthCheck(state, "state", 1, 150)) return
	if (lengthCheck(city, "city", 1, 150)) return
	if (lengthCheck(address_detail, "address_detail", 1, 0)) return
	if (lengthCheck(postal_code, "postal_code", 1, 35)) return

	// save data in object to stringify
	const data = {
		address_name,
		country,
		state,
		city,
		address_detail,
		postal_code,
	}

	// fetch data
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/user-address/`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		Authentication: `Bearer ${localStorage.getItem("access")}`,
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.error(err))
}
