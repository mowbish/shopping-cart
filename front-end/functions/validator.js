export function lengthCheck(variable, name, min, max) {
	if (!(variable.length >= min && variable.length <= max))
		alert(`${name} length should be ${min}-${max}`)
	return true
}

export default function validator(variable) {
	const type = Object.keys({ variable })[0]

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
			break

		case "lastname":
			if (variable.length >= 0 && variable.length <= 150) return true
			alert("last name length must be 0-150")
			return false
			break

		case "email":
			if (variable.length >= 0 && variable.length <= 254) return true
			alert("email length must be 0-254")
			return false
			break

		default:
			break
	}
}
