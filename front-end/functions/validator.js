export function lengthCheck(variable, name, min, max) {
	if (!(variable.length >= min && variable.length <= max)) alert(`${name} length should be ${min}-${max}`)
	return true
}

export default function validator(variable, type) {
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

		case "firstname":
			if (variable.length >= 0 && variable.length <= 150) return true
			alert("first name length must be 0-150")
			return false

		case "lastname":
			if (variable.length >= 0 && variable.length <= 150) return true
			alert("last name length must be 0-150")
			return false

		case "email":
			if (variable.length >= 0 && variable.length <= 254) return true
			alert("email length must be 0-254")
			return false

		case "addressName":
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

		case "addressDetail":
			if (variable.length >= 1) return true
			alert("address_detail min length is 1")
			return false

		case "postalCode":
			if (variable.length >= 1 && variable.length <= 35) return true
			alert("postal_code length must be 1-35")
			return false

		default:
			alert("validator couldnt detect value key")
			break
	}
}
