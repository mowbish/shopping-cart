import { storage, api, validator } from "../main"

export async function doesExist(username) {
	const [res, data] = await api(`/api/user/is-exists/?username=${username}`)

	if (res.ok) return true
	else return false
}
export async function signup(passedData) {
	const { passwordRepeat, remember, ...body } = passedData

	// validation
	const valid = validator(body)
	if (!valid) return false
	if (passedData.passwordRepeat != passedData.password) {
		alert("second password doesnt match the first one")
		return false
	}

	const [res, data] = await api("/api/user/sign-up/", "POST", body, false)

	if (!res.ok) return false
	else return login(passedData.username, passedData.password, remember)
}
export async function login(username, password, remember) {
	const valid = validator({ username, password })
	if (!valid) return false

	const [res, data] = await api("/api/token/", "POST", { username, password }, false)

	localStorage.setItem("remember", remember)

	if (res.ok) {
		;[
			["access", data.access],
			["refresh", data.refresh],
			["username", username],
			["lastLog", new Date().getTime()],
		].forEach((array) => {
			storage().setItem(array[0], array[1])
		})

		sessionStorage.setItem("isLoged", true)
		setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)

		return true
	} else return false
}
export async function updateToken(refresh) {
	const [res, data] = await api("/api/token/refresh/", "POST", { refresh }, false)

	if (res.ok) {
		storage().setItem("access", data.access)
		storage().setItem("lastLog", new Date().getTime())

		setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)
		return true
	} else return false
}
export async function logout() {
	const [res, data] = await api("/api-auth/logout/")
	return res.ok
}
export async function remove() {
	const username = storage().getItem("username")

	const [res, data] = await api(`/api/user/${username}/`, "DELETE")

	return res.ok
}
export async function getUser() {
	const username = storage().getItem("username")

	const [res, data] = await api(`/api/user/${username}/`)

	if (res.ok) return await res.json()
	else return false
}
export async function updateUser(passedData) {
	const valid = validator(passedData)
	if (!valid) return false

	const username = storage().getItem("username")
	const [res, data] = await api(`/api/user/${username}/`, "PUT", passedData)

	if (res.ok) {
		storage().setItem("username", passedData.username)
		return await res.json()
	} else return false
}
