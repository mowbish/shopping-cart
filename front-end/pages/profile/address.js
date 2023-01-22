import Link from "next/link"
import login from "../../components/Login"
import Input from "../../components/input"

export default function Login() {
	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		login(list.username.value, list.password.value)
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				<Input
					label="uname"
					placeHolder="Enter Username"
					name="username"
					type="text"
					required="required"
				/>

				<Input
					label="psw"
					placeHolder="Enter Password"
					name="password"
					type="password"
					required="required"
				/>

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
