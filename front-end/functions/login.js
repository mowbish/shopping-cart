import lengthCheck from "../functions/lengthCheck"
import refresher from "./refresher"

export default function login(username, password, router) {
	// username validator
	lengthCheck(username, "username", 1, 150)
	for (let i = 0; i < username.length; i++)
		if (
			!(
				(username[i] >= "a" && username[i] <= "z") ||
				(username[i] >= "A" && username[i] <= "z") ||
				(username[i] >= "0" && username[i] <= "9") ||
				username[i] == "+" ||
				username[i] == "-" ||
				username[i] == "." ||
				username[i] == "@"
			)
		)
			return alert("you can only use 0-9 a-z A-Z + - _ . and @ in your username")

	// password validator
	lengthCheck(password, "password", 1, 128)

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
			updateToken(data, router)
			setInterval(refresher(localStorage.getItem("refresh")), 3300000)
		})
		.catch((err) => console.error(err))
}

function updateToken(data, router) {
	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
	router.push("/")
}
