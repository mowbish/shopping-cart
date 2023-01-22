import { useDispatch } from "react-redux"
import Link from "next/link"
import login from "../../components/login"
import Input from "../../components/Input"
import { useRouter } from "next/router"

export default function Login() {
	const dispatch = useDispatch()
	const router = useRouter()

	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		login(list.username.value, list.password.value, router)
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				<Input
					label="Username"
					placeHolder="Enter Username"
					name="username"
					required="true"
				/>

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
