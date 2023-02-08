import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoged } from "../data/user"
import root from "../functions/api/webLink"
import { useEffect, useState } from "react"
import Link from "next/link"
import Input from "../components/input"
import loginApi, {
	signup as signupApi,
	doesExist as existApi,
} from "../functions/api/account"

function Login({ username }) {
	const router = useRouter()

	function submitHandler(event) {
		event.preventDefault()
		const list = event.target.children

		loginApi(router, list.username.value, list.password.value)
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
					<input type="checkbox" checked="checked" onChange={() => {}} name="remember" />
					Remember me
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

	function submitHandler(event) {
		event.preventDefault()
		const list = event.target.children

		signupApi(
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
	)
}
function CheckExistance() {
	const [ui, setUi] = useState()

	useEffect(() => {
		const temp = localStorage.getItem("username")
		console.log(temp)
		if (temp !== undefined || temp !== null)
			setUi(
				<form
					onSubmit={async (event) => {
						event.preventDefault()
						const username = event.target.children.username.value

						const doesExist = await existApi(username)
						console.log(doesExist)
						if (doesExist) setUi(<Login username={username} />)
						else setUi(<Signup username={username} />)
					}}
				>
					<Input
						label="username"
						placeHolder="enter your username"
						name="username"
						type="text"
						value={temp}
						required
					/>
					<br />
					<button type="submit">Login</button>
				</form>
			)
		else
			setUi(
				<form
					onSubmit={async (event) => {
						event.preventDefault()
						const username = event.target.children.username.value

						const doesExist = await existApi(username)
						console.log(doesExist)
						if (doesExist) setUi(<Login username={username} />)
						else setUi(<Signup username={username} />)
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
	}, [])

	return ui
}

function Profile() {
	const database = useDispatch()
	const router = useRouter()

	async function logout() {
		const headers = {}
		const res = await fetch(`${root()}/api-auth/logout/`, headers)
		if (res.ok) {
			;["access", "refresh", "lastLog"].forEach((key) => localStorage.removeItem(key))
			database(setIsLoged(false))
		} else {
			alert("couldnt log out")
		}

		router.push("/")
	}

	return (
		<>
			<button onClick={logout}>Log out</button>
		</>
	)
}

export default function FirstView() {
	const isLoged = useSelector((store) => store.user.isLoged)
	const [ui, setUi] = useState(<Profile />)

	useEffect(() => {
		if (isLoged) setUi(<Profile />)
		else setUi(<CheckExistance />)
	}, [])

	return ui
}
