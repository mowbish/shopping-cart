export function storage() {
	return localStorage.getItem("remember") === "true" ? localStorage : sessionStorage
}
function fetchOption(method, body, authorization, content) {
	const whatToReturn = { method, headers: {} }

	// set body
	if (body !== false) whatToReturn.body = JSON.stringify(body)

	// authorization
	if (authorization) whatToReturn.headers.Authorization = "Bearer " + storage().getItem("access")

	if (content === "aj") whatToReturn.headers = { ...whatToReturn.headers, "Content-Type": "application/json" }

	return whatToReturn
}
export async function api(url, method = "GET", body = false, authorization = true, content = "aj") {
	// set root
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production") root = window.location.origin.replace("3", "8")

	// set options
	const options = fetchOption(method, body, authorization, content)

	// fetch
	const result = await fetch(root + url, options)
	const data = await result.json()

	// manage errors
	if (!result.ok) Object.entries(dataPack).forEach((entry) => alert(entry[1]))

	// return result
	return [result, data]
}
export function validator(data) {
	let dataIsValid = true

	Object.keys(data).filter((key) => {
		const valid = singleValidator(data[key], key)

		if (!valid) dataIsValid = false
	})

	return dataIsValid
}

function singleValidator(variable, type) {
	switch (type) {
		case "username":
			for (let i = 0; i < variable.length; i++)
				if (
					!(
						(variable[i] >= "a" && variable[i] <= "z") ||
						(variable[i] >= "A" && variable[i] <= "z") ||
						(variable[i] >= "0" && variable[i] <= "9") ||
						variable[i] == "+" ||
						variable[i] == "-" ||
						variable[i] == "." ||
						variable[i] == "@"
					)
				) {
					alert("you can only use 0-9 a-z A-Z + - _ . and @ in your username")
					return false
				}
			return true

		case "password":
			if (variable.length >= 1 && variable.length <= 128) return true
			alert("password length must be 1-128")
			return false

		case "first_name":
			if (variable.length >= 0 && variable.length <= 150) return true
			alert("first name length must be 0-150")
			return false

		case "last_name":
			if (variable.length >= 0 && variable.length <= 150) return true
			alert("last name length must be 0-150")
			return false

		case "email":
			if (variable.length >= 0 && variable.length <= 254) return true
			alert("email length must be 0-254")
			return false

		case "address_name":
			if (variable.length >= 1 && variable.length <= 30) return true
			alert("address_name length must be 1-30")
			return false

		case "country":
			if (variable.length >= 0 && variable.length <= 30) return true
			alert("country length must be 0-30")
			return false

		case "state":
			if (variable.length >= 1 && variable.length <= 150) return true
			alert("state length must be 1-150")
			return false

		case "city":
			if (variable.length >= 1 && variable.length <= 150) return true
			alert("city length must be 1-150")
			return false

		case "address_detail":
			if (variable.length >= 1) return true
			alert("address_detail min length is 1")
			return false

		case "postal_code":
			if (variable.length >= 1 && variable.length <= 35) return true
			alert("postal_code length must be 1-35")
			return false

		default:
			alert("validator couldnt detect value key")
			return false
	}
}
