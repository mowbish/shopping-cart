import validator from "../validator"
import root from "./webLink"

export async function doesExist(username) {
	// fetch data
	const res = await fetch(`${root()}/api/user/is-exists/?username=${username}`)
	const data = await res.json()

	if (data.is_active) return true
	else return false
}
export async function signup(
	router,
	username,
	firstname,
	lastname,
	email,
	password,
	passwordRepeat
) {
	validator(username)
	validator(password)
	validator(firstname)
	validator(lastname)
	validator(email)
	if (passwordRepeat != password) return alert("password is not same") // password repeat validator

	// save data in object to stringify
	const body = {
		username,
		first_name: firstname,
		last_name: lastname,
		email,
		password,
	}

	// fetch
	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}
	const res = await fetch(`${root()}/api/user/sign-up/`, headers)
	const status = res.status

	// data
	const data = await res.json()

	if (!(status == 200 || status == 201)) {
		Object.entries(data).forEach((error) => alert(error[1]))
		return
	}

	localStorage.setItem("username", username)

	login(router, username, password)
}
export default async function login(router, username, password) {
	validator(username)
	validator(password)

	// fetch
	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	}
	const res = await fetch(`${root()}/api/token/`, headers)
	const data = await res.json()

	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
	localStorage.setItem("lastLog", new Date().getTime())
	setTimeout(() => updateToken(localStorage.getItem("refresh")), 3420000)

	router.push("/")
}
export async function updateToken(refreshToken) {
	const headers = {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refreshToken }),
	}
	const res = await fetch(`${root()}/api/token/refresh/`, headers)
	const data = res.json()

	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
	localStorage.setItem("lastLog", new Date().getTime())

	setTimeout(() => updateToken(localStorage.getItem("refresh")), 3420000)
}
export function showProfile() {
	const id = 1

	// fetch data
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/user/${id}/`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("access"),
		},
	})
		.then((res) => {
			if (res.ok) return res.json()
		})
		.then((data) => {
			console.log("this is data: ", data)
		})
		.catch((err) => console.error(err))
}
export function addAddress(
	address_name,
	country,
	state,
	city,
	address_detail,
	postal_code
) {
	// if (lengthCheck(address_name, "address_name", 1, 30)) return
	// if (lengthCheck(country, "country", 0, 30)) return
	// if (lengthCheck(state, "state", 1, 150)) return
	// if (lengthCheck(city, "city", 1, 150)) return
	// if (lengthCheck(address_detail, "address_detail", 1, 0)) return
	// if (lengthCheck(postal_code, "postal_code", 1, 35)) return

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
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("access"),
		},
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (res.ok) return res.json()
		})
		.catch((err) => console.error(err))
}
