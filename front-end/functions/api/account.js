import validator from "../validator"
import { storage, root } from "../main"

export async function doesExist(username) {
	// fetch data
	const res = await fetch(`${root()}/api/user/is-exists/?username=${username}`)
	const data = await res.json()

	if (data.is_active) return true
	else return false
}
export async function signup(username, firstname, lastname, email, password, passwordRepeat, remember) {
	if (!validator(username, "username")) return
	if (!validator(password, "password")) return
	if (!validator(firstname, "firstname")) return
	if (!validator(lastname, "lastname")) return
	if (!validator(email, "email")) return
	if (passwordRepeat != password) return alert("password is not same") // password repeat validator

	const body = {
		username,
		first_name: firstname,
		last_name: lastname,
		email,
		password,
	}
	const options = {
		method: "post",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/user/sign-up/`, options)
	const data = await res.json()

	if (!res.ok) {
		Object.entries(data).forEach((error) => alert(error[1]))
		return
	}

	return login(username, password, remember)
}
export async function login(username, password, remember) {
	if (!validator(username, "username")) return
	if (!validator(password, "password")) return

	const options = {
		method: "post",
		body: JSON.stringify({ username, password }),
		headers: { "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/token/`, options)
	const data = await res.json()

	localStorage.setItem("remember", remember)

	if (res.ok) {
		storage().setItem("access", data.access)
		storage().setItem("refresh", data.refresh)
		storage().setItem("username", username)
		storage().setItem("lastLog", new Date().getTime())
		sessionStorage.setItem("isLoged", true)
		setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)

		return true
	} else {
		return false
	}
}
export async function updateToken(refreshToken) {
	const options = {
		method: "post",
		body: JSON.stringify({ refreshToken }),
		headers: { "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/token/refresh/`, options)
	const data = res.json()

	storage().setItem("access", data.access)
	storage().setItem("refresh", data.refresh)
	storage().setItem("lastLog", new Date().getTime())

	setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)
}
export async function logout() {
	const options = {}
	const res = await fetch(`${root()}/api-auth/logout/`, options)
	return res.ok
}
export async function remove() {
	const username = storage().getItem("username")

	const options = {
		method: "DELETE",
		headers: { Authorization: "Bearer " + storage().getItem("access") },
	}
	const res = await fetch(`${root()}/api/user/${username}/`, options)
	return res.ok
}
export async function getUser() {
	const username = storage().getItem("username")

	const options = {
		headers: { Authorization: "Bearer " + storage().getItem("access") },
	}
	const res = await fetch(`${root()}/api/user/${username}/`, options)

	if (res.ok) return await res.json()
	else alert("couldnt get user data")

	return await res.json()
}
export async function updateUser(username, firstname, lastname, email) {
	if (!validator(username, "username")) return
	if (!validator(firstname, "firstname")) return
	if (!validator(lastname, "lastname")) return
	if (!validator(email, "email")) return

	const body = {
		username,
		first_name: firstname,
		last_name: lastname,
		email,
	}

	const oldUsername = storage().getItem("username")
	const options = {
		method: "PUT",
		body: JSON.stringify(body),
		headers: { Authorization: "Bearer " + storage().getItem("access"), "Content-Type": "application/json" },
	}
	const res = await fetch(`${root()}/api/user/${oldUsername}/`, options)

	if (res.ok) {
		storage().setItem("username", username)
		return await res.json()
	} else alert("couldnt update user")
}
