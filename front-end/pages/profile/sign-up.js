import Link from "next/link"
import signup from "../../components/signup"
import Input from "../../components/input"
import { useDispatch } from "react-redux"

export default function Login() {
	const dispatch = useDispatch()
	const inputData = [
		{
			label: "email",
			placeHolder: "Enter Email",
			name: "email",
			type: "emeil",
			required: "required",
		},
		{
			label: "first_name",
			placeHolder: "Enter first name",
			name: "first_name",
			type: "text",
			required: "required",
		},
		{
			label: "last_name",
			placeHolder: "Enter Enter last name",
			name: "last_name",
			type: "text",
			required: "required",
		},
		{
			label: "username",
			placeHolder: "Enter Enter username",
			name: "username",
			type: "text",
			required: "required",
		},
		{
			label: "password",
			placeHolder: "Enter Password",
			name: "password",
			type: "password",
			required: "required",
		},
		{
			label: "password Repeat",
			placeHolder: "reapet password",
			name: "passwordR",
			type: "password",
			required: "required",
		},
	]

	const formSubmitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		signup(
			list.username.value,
			list.first_name.value,
			list.last_name.value,
			list.email.value,
			list.password.value,
			list.passwordR.value,
		)
	}
	return (
		<>
			<form onSubmit={formSubmitHandler}>
				{inputData.map((input) => (
					<>
						<Input
							label={input.label}
							placeHolder={input.placeHolder}
							name={input.name}
							type={input.type}
							required={input.required}
						/>
						<br />
					</>
				))}
				<label>
					<input type="checkbox" checked="checked" name="remember" readOnly />
					Remember me
				</label>
				<p>
					By creating an account you agree to our
					<Link href="/about#terms">Terms</Link>
					<Link href="/about#privacy">Privacy</Link>.
				</p>
				<button type="submit">Sign Up</button>
			</form>
		</>
	)
}
