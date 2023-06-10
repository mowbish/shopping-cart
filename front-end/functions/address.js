import { api } from "./main"

export async function getAddressApi() {
	const [res, data] = await api("api/user-address", [200], true)

	if (res.ok) return data
	else return false
}
export async function addAddressApi(passedData) {
	const [res, data] = await api("api/user-address/", [201], true, "POST", passedData, "aj")

	if (res.ok) return true
	else return false
}
export async function removeAddressApi(postal_code) {
	const [res, data] = await api(`api/user-address/${postal_code}`, [204], true, "DELETE")

	if (res.ok) return true
	else return false
}
export async function updateAddressApi(postal_code, body) {
	const [res, data] = await api(`api/user-address/${postal_code}/`, [200], true, "PUT", body, "aj")

	if (res.ok) return true
	else return false
}
