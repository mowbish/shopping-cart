import Link from "next/link"
import signup from "../../components/signup"
import Input from "../../components/input"

export default function Login() {
	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		signup(
			list.username.value,
			list.first_name.value,
			list.last_name.value,
			list.email.value,
			list.password.value,
			list.passwordR.value
		)
	}
	return (
		<>
			<form onSubmit={formSubmitHandler}>
				<Input
					label="Email"
					placeHolder="Enter Email"
					name="email"
					type="email"
					required="required"
				/>
				<br />
				<Input
					label="first_name"
					placeHolder="Enter Enter first name"
					name="first_name"
					type="text"
					required="required"
				/>
				<br />
				<Input
					label="last_name"
					placeHolder="Enter Enter last name"
					name="last_name"
					type="text"
					required="required"
				/>
				<br />
				<Input
					label="username"
					placeHolder="Enter Enter username"
					name="username"
					type="text"
					required="required"
				/>
				<br />
				<Input
					label="password"
					placeHolder="Enter Password"
					name="password"
					type="password"
					required="required"
				/>
				<br />
				<Input
					label="passwordR"
					placeHolder="Repeat Password"
					name="passwordR"
					type="password"
					required="required"
				/>
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
