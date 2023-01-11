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
		value = list.first_name.value // first name
		if (!(value.length <= 150)) return alert("first name maximum length is 150")
		value = list.last_name.value // last name
		if (!(value.length <= 150)) return alert("last name maximum length is 150")
		value = list.email.value // email
		if (!(value.length <= 254)) return alert("email maximum length is 128")
		value = list.password.value // password
		if (!(value.length >= 1 && value.length <= 128))
			return alert("password length should be 1-128")
		value = list.passwordR.value // passwordR
		if (value != list.password.value) return alert("password is not same")

		// save data in object to stringify
		const data = {
			username: list.username.value,
			first_name: list.first_name.value,
			last_name: list.last_name.value,
			email: list.email.value,
			password: list.password.value,
		}

		// fetch data
		let root = window.location.origin
		if (process.env.NODE_ENV !== "production")
			root = window.location.origin.replace("3", "8")
		fetch(`${root}/api/user/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
	}

	return (
		<>
			<form onSubmit={formSubmitHandler}>
				<label htmlFor="email">
					<b>Email</b>
				</label>
				<input type="text" placeholder="Enter Email" name="email" required />
				<br />

				<label htmlFor="first_name">
					<b>first_name</b>
				</label>
				<input
					type="text"
					placeholder="Enter Enter first name"
					name="first_name"
					required
				/>
				<br />

				<label htmlFor="last_name">
					<b>last_name</b>
				</label>
				<input
					type="text"
					placeholder="Enter Enter last name"
					name="last_name"
					required
				/>
				<br />

				<label htmlFor="username">
					<b>Username</b>
				</label>
				<input type="text" placeholder="Enter Enter username" name="username" required />
				<br />

				<label htmlFor="password">
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="password" required />
				<br />

				<label htmlFor="passwordR">
					<b>Repeat Password</b>
				</label>
				<input type="password" placeholder="Repeat Password" name="passwordR" required />
				<br />

				<label>
					<input type="checkbox" checked="checked" name="remember" readOnly />
					Remember me
				</label>
				<p>
					By creating an account you agree to our
					<Link href="/about#terms">Terms</Link> &{" "}
					<Link href="/about#privacy">Privacy</Link>.
				</p>
				<button type="submit">Sign Up</button>
			</form>
		</>
	)
}
