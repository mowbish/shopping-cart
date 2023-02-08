import validator from "../validator"
import { storage, root } from "../main"

export async function doesExist(username) {
	// fetch data
	const res = await fetch(`${root()}/api/user/is-exists/?username=${username}`)
	const data = await res.json()

	if (data.is_active) return true
	else return false
}
export async function signup(
	username,
	firstname,
	lastname,
	email,
	password,
	passwordRepeat,
	remember
) {
	validator(username)
	validator(password)
	validator(firstname)
	validator(lastname)
	validator(email)
	if (passwordRepeat != password) return alert("password is not same") // password repeat validator

	const body = {
		username,
		first_name: firstname,
		last_name: lastname,
		email,
		password,
	}
	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}
	const res = await fetch(`${root()}/api/user/sign-up/`, headers)
	const data = await res.json()

	if (!res.ok) {
		Object.entries(data).forEach((error) => alert(error[1]))
		return
	}

	return login(username, password, remember)
}
export default async function login(username, password, remember) {
	validator(username)
	validator(password)

	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	}
	const res = await fetch(`${root()}/api/token/`, headers)
	const data = await res.json()

	localStorage.setItem("remember", remember)

	if (res.ok) {
		storage().setItem("access", data.access)
		storage().setItem("refresh", data.refresh)
		storage().setItem("username", username)
		storage().setItem("lastLog", new Date().getTime())
		storage().setItem("isLoged", true)
		setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)

		return true
	} else {
		return false
	}
}
export async function updateToken(refreshToken) {
	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refreshToken }),
	}
	const res = await fetch(`${root()}/api/token/refresh/`, headers)
	const data = res.json()

	storage().setItem("access", data.access)
	storage().setItem("refresh", data.refresh)
	storage().setItem("lastLog", new Date().getTime())

	setTimeout(() => updateToken(storage().getItem("refresh")), 3420000)
}
