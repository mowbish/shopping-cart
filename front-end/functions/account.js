import { storage, api } from "./main"

export async function userExistApi(username) {
	const [res, data] = await api(`api/user/is-exists/?username=${username}`, [200, 404])

	if (res.ok) return true
	else return false
}
export async function signupApi(passedData) {
	const { passwordRepeat, remember, ...body } = passedData

	// validation
	if (passedData.passwordRepeat != passedData.password) {
		alert("second password doesnt match the first one")
		return false
	}

	const [res, data] = await api("api/user/sign-up/", [200], false, "POST", body, "aj")

	if (res.ok) return loginApi(passedData.username, passedData.password, remember)
	else return false
}
export async function loginApi(username, password, remember) {
	const [res, data] = await api("api/token/", [200], true, "POST", { username, password }, "aj")

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
		setTimeout(() => updateTokenApi(storage().getItem("refresh")), process.env.tokenLife)

		return true
	} else return false
}
export async function updateTokenApi(refresh) {
	const [res, data] = await api("api/token/refresh/", [200], false, "POST", { refresh }, "aj")

	if (res.ok) {
		storage().setItem("access", data.access)
		storage().setItem("lastLog", new Date().getTime())

		setTimeout(() => updateTokenApi(storage().getItem("refresh")), process.env.tokenLife)
		return true
	} else return false
}
export async function logoutApi() {
	const [res, data] = await api("api-auth/logout/", [200], true)

	if (res.ok) {
		;["access", "refresh", "lastLog"].forEach((key) => storage().removeItem(key))
		sessionStorage.setItem("isLoged", false)

		return true
	} else return false
}
export async function removeUserApi() {
	const username = storage().getItem("username")

	const [res, data] = await api(`api/user/${username}/`, [200, 204], true, "DELETE")

	return res.ok
}
export async function getUserApi() {
	const username = storage().getItem("username")

	const [res, data] = await api(`api/user/${username}/`, [200], true)

	if (res.ok) return data
	else return false
}
export async function updateUserApi(passedData) {
	const username = storage().getItem("username")
	const [res, data] = await api(`api/user/${username}/`, [200], true, "PUT", passedData, "aj")

	if (res.ok) {
		storage().setItem("username", passedData.username)
		return data
	} else return false
}
