import validator from "../validator"

export default function login(router, username, password) {
	validator("username", username)
	validator("password", password)

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
			router.push("/")
			setInterval(refresher(localStorage.getItem("refresh")), 3300000)
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
	fetch(`${root}/api/user-address`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (res.ok) return res.json()
		})
		.then((data) => updateToken(data))
		.catch((err) => console.error(err))
}

export function updateToken(data) {
	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
}
