import validator from "../validator"
import { storage, root } from "../main"

export async function getAddress() {
	const options = {
		headers: { Authorization: "Bearer " + storage().getItem("access"), "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/user-address`, options)

	if (res.ok) return await res.json()
	else alert("Couldn't get address list")
}
export async function addAddress(address_name, country, state, city, address_detail, postal_code) {
	const valid =
		validator(address_name, "addressName") &&
		validator(country, "country") &&
		validator(state, "state") &&
		validator(city, "city") &&
		validator(address_detail, "addressDetail") &&
		validator(postal_code, "postalCode")
	if (!valid) return false

	const body = {
		address_name,
		country,
		state,
		city,
		address_detail,
		postal_code,
	}
	const options = {
		method: "POST",
		body: JSON.stringify(body),
		headers: { Authorization: "Bearer " + storage().getItem("access"), "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/user-address/`, options)

	if (res.ok) return true
	else return await res.json()
}
export async function removeAddress(postal_code) {
	const options = {
		method: "DELETE",
		headers: { Authorization: "Bearer " + storage().getItem("access"), "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/user-address/${postal_code}`, options)

	if (res.ok) return true
	else alert("could not delete address")
}
