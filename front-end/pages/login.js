import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Input from "../components/input"
import loginHandler from "../functions/profile/login"
import signupHandler from "../functions/profile/signup"

function Login({ username }) {
	const router = useRouter()

	const submitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		loginHandler(router, list.username.value, list.password.value)
	}

	return (
		<>
			<form onSubmit={submitHandler}>
				<Input
					label="username"
					placeHolder="enter your username"
					name="username"
					type="text"
					value={username}
					required
				/>
				<Input
					label="Password"
					placeHolder="enter your password"
					name="password"
					type="password"
					required
				/>

				<label>
					<input type="checkbox" checked="checked" name="remember" /> Remember me
				</label>
				<br />
				<span className="psw">
					Forgot <Link href="./forgot">password?</Link>
				</span>

				<button type="submit">Log In</button>
			</form>
		</>
	)
}

function Signup({ username }) {
	const router = useRouter()

	const inputData = [
		{
			label: "first_name",
			placeHolder: "first_name",
			name: "first_name",
			type: "text",
			required: "required",
		},
		{
			label: "last_name",
			placeHolder: "last_name",
			name: "last_name",
			type: "text",
		},
		{
			label: "username",
			placeHolder: "username",
			name: "username",
			type: "text",
			required: "required",
		},
		{
			label: "email",
			placeHolder: "email",
			name: "email",
			type: "text",
			required: "required",
		},
		{
			label: "password",
			placeHolder: "password",
			name: "password",
			type: "password",
			required: "required",
		},
		{
			label: "passwordRepeat",
			placeHolder: "passwordRepeat",
			name: "passwordRepeat",
			type: "password",
			required: "required",
		},
	]
	const inputList = inputData.map((input) => {
		const value = input.name === "username" ? username : false

		return (
			<>
				<Input
					label={input.label}
					placeHolder={input.placeHolder}
					name={input.name}
					type={input.type}
					value={value}
					required
				/>
				<br />
			</>
		)
	})

	const submitHandler = (event) => {
		event.preventDefault()
		const list = event.target.children

		signupHandler(
			router,
			list.username.value,
			list.first_name.value,
			list.last_name.value,
			list.email.value,
			list.password.value,
			list.passwordRepeat.value
		)
	}

	return (
		<>
			<form onSubmit={submitHandler}>
				{inputList}
				<br />

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

export default function Profile() {
	const [ui, setUi] = useState(
		<form
			onSubmit={(event) => {
				event.preventDefault()
				const username = event.target.children.username.value

				// fetch data
				let root = window.location.origin
				if (process.env.NODE_ENV !== "production")
					root = window.location.origin.replace("3", "8")
				fetch(`${root}/api/user/is-exists/?username=${username}`)
					.then((res) => res.json())
					.then((data) => {
						if (data.is_active) setUi(<Login username={username} />)
						else if (!data.is_active) setUi(<Signup username={username} />)
						else alert("error on check existience")
					})
					.catch((err) => console.error(err))
			}}
		>
			<Input
				label="username"
				placeHolder="enter your username"
				name="username"
				type="text"
				required
			/>
			<br />
			<button type="submit">Login</button>
		</form>
	)

	return ui
}
