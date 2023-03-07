import { api, validator } from "../main"

export async function getAddress() {
	const [res, data] = await api("/api/user-address")

	if (res.ok) return data
	else return false
}
export async function addAddress(passedData) {
	const valid = validator(passedData)
	if (!valid) return false

	const [res, data] = await api("/api/user-address/", "POST", passedData)

	if (res.ok) return true
	else return false
}
export async function removeAddress(postal_code) {
	const [res, data] = await fetch(`/api/user-address/${postal_code}`, "DELETE")

	if (res.ok) return true
	else return false
}
