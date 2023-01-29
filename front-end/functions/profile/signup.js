import login from "./login"
import validator from "../validator"

export default function Signup(
	router,
	username,
	firstname,
	lastname,
	email,
	password,
	passwordRepeat
) {
	validator("username", username)
	validator("password", password)
	validator("firstname", firstname)
	validator("lastname", lastname)
	validator("email", email)

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
