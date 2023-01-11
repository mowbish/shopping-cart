import Link from "next/link"
export default function Login() {
	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		// validators
		let value = list.username.value // username
		if (!(value.length >= 1 && value.length <= 150))
			return alert("username length should be 1-150")
		for (let i = 0; i < value.length; i++)
			if (
				!(
					(value[i] >= "a" && value[i] <= "z") ||
					(value[i] >= "A" && value[i] <= "z") ||
					(value[i] >= "0" && value[i] <= "9") ||
					value[i] == "+" ||
					value[i] == "-" ||
					value[i] == "_" ||
					value[i] == "." ||
					value[i] == "@"
				)
			)
				return alert("you can only use 0-9 a-z A-Z + - _ . and @ in your username")
		value = list.password.value // password
		if (!(value.length >= 1 && value.length <= 128))
			return alert("password length should be 1-128")

		// save data in object to stringify
		const data = {
			username: list.username.value,
			password: list.password.value,
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
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				<label htmlFor="uname">
					<b>Username</b>
				</label>
				<input type="text" placeholder="Enter Username" name="username" required />

				<label htmlFor="psw">
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="password" required />

				<label>
					<input type="checkbox" checked="checked" name="remember" /> Remember me
				</label>
				<br />
				<span className="psw">
					Forgot <Link href="./forgot">password?</Link>
				</span>
				<br />
				<button type="submit">Login</button>
			</form>
		</>
	)
}
