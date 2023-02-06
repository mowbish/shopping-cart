import validator from "../validator"
import { setIsLoged } from "../../data/user"

//######################################### sign up
export function signup(
	router,
	dispatch,
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
	const data = {
		username,
		first_name: firstname,
		last_name: lastname,
		email,
		password,
	}

	// fetch data
	let status
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/user/sign-up/`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			status = res.status
			return res.json()
		})
		.then((data) => {
			if (status == 200 || status == 201) login(router, username, password)
			else
				Object.entries(data).forEach((entry) => {
					const [key, value] = entry
					alert(value)
				})
		})
		.catch((err) => console.error(err))
}

//######################################### log in
export default function login(router, username, password) {
	validator(username)
    validator(password )

	// save data in object to stringify
	const data = {
		username,
		password,
	}

	// fetch data
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/token/`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (res.ok) return res.json()
		})
		.then((data) => {
			updateToken(data)
			localStorage.setItem("lastLoged", new Date().getTime())
			setInterval(refresher(localStorage.getItem("refresh")), 3300000)
			router.push("/")
		})
		.catch((err) => console.error(err))
}

export function refresher(refreshToekn) {
	// save data in object to stringify
	const data = {
		refreshToekn,
	}

	// fetch data
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/token/refresh/`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			console.log(res)
			if (res.ok) return res.json()
		})
		.then((data) => {
			console.log(data)
			updateToken(data)
			localStorage.setItem("lastLoged", new Date().getTime())
		})
		.catch((err) => console.error(err))
}

export function updateToken(data) {
	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
}

//######################################### show profile
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

//######################################### add address
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
