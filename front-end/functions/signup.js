import login from "./login"
import lengthCheck from "../functions/lengthCheck"

export default function Signup(
	username,
	firstname,
	lastname,
	email,
	password,
	passwordReapet
) {
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
				username[i] == "" ||
				username[i] == "." ||
				username[i] == "@"
			)
		)
			return alert("you can only use 0-9 a-z A-Z + - _ . and @ in your username")
	lengthCheck(firstname, "firstname", 0, 150)
	lengthCheck(lastname, "lastname", 0, 150)
	lengthCheck(email, "email", 0, 254)
	lengthCheck(password, "password", 1, 128)
	if (passwordReapet != password) return alert("password is not same") // password repeat validator

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
	fetch(`${root}/api/user/`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			status = res.status
			return res.json()
		})
		.then((data) => {
			if (status == 200 || status == 201) login(username, password)
			else
				Object.entries(data).forEach((entry) => {
					const [key, value] = entry
					alert(value)
				})
		})
		.catch((err) => console.error(err))
}
