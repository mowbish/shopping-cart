import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { setAccount } from "../../data/user"
import { storage } from "../../functions/main"
import { useEffect, useState } from "react"
import Link from "next/link"
import Input from "../../components/input"
import {
	login as loginApi,
	signup as signupApi,
	doesExist as existApi,
	logout as logoutApi,
	remove as removeApi,
	getUser as getUserApi,
	updateUser as updateUserApi,
} from "../../functions/api/account"

function Login({ username }) {
	const router = useRouter()
	const [checkbox, setCheckbox] = useState(true)
	const database = useDispatch()

	function submitHandler(event) {
		event.preventDefault()
		const { username, password, rememberLoginCheck } = event.target.children

		const loged = loginApi(username.value, password.value, rememberLoginCheck.checked)

		if (loged) router.push("/")
	}
	const rememberHandler = () => setCheckbox((prev) => !prev)
	return (
		<form onSubmit={submitHandler}>
			<Input label="username" placeHolder="enter your username" name="username" type="text" value={username} required />
			<Input label="Password" placeHolder="enter your password" name="password" type="password" required />

			<input type="checkbox" checked={checkbox} onChange={rememberHandler} id="rememberLoginCheck" />
			<label htmlFor="rememberLoginCheck">Remember me</label>
			<br />
			<span className="psw">
				Forgot <Link href="./forgot">password?</Link>
			</span>

			<button type="submit">Log In</button>
		</form>
	)
}
function Signup({ username }) {
	const router = useRouter()
	const [checkbox, setCheckbox] = useState(true)
	const database = useDispatch()

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
		//prettier-ignore
		const {username,first_name,last_name,email,password,passwordRepeat,rememberSignCheck} = event.target.children

		const loged = signupApi(
			username.value,
			first_name.value,
			last_name.value,
			email.value,
			password.value,
			passwordRepeat.value,
			rememberSignCheck.checked
		)

		if (loged) router.push("/")
	}
	const rememberHandler = () => setCheckbox((prev) => !prev)
	return (
		<form onSubmit={submitHandler}>
			{inputList}
			<br />
			<input type="checkbox" checked={checkbox} onChange={rememberHandler} id="rememberSignCheck" />
			<label htmlFor="rememberSignCheck">Remember me</label>
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

	const renderUi = (username = undefined) => {
		return (
			<form
				onSubmit={async (event) => {
					event.preventDefault()
					const username = event.target.children.username.value

					const doesExist = await existApi(username)
					if (doesExist) setUi(<Login username={username} />)
					else setUi(<Signup username={username} />)
				}}
			>
				<Input
					label="username"
					placeHolder="enter your username"
					name="username"
					type="text"
					value={username == undefined ? "" : username}
					required
				/>
				<br />
				<button type="submit">Login</button>
			</form>
		)
	}

	useEffect(() => {
		const username = storage().getItem("username")
		if (username !== undefined || username !== null) setUi(renderUi(username))
		else setUi(renderUi())
	}, [])

	return ui
}

function Profile() {
	const database = useDispatch()
	const account = useSelector((store) => store.user.account)
	const router = useRouter()
	const [userData, setUserData] = useState()

	// get the data at first load and save them in the database
	useEffect(() => {
		async function temp() {
			const newAccount = await getUserApi()
			delete newAccount.is_active
			database(setAccount(newAccount))
		}
		temp()
	}, [])

	// set new data in ui when the data changes
	useEffect(() => {
		const form = Object.entries(account).map((key) => {
			return (
				<>
					<Input label={key[0]} required="required" name={key[0]} placeHolder={key[0]} value={key[1]} />
					<br />
				</>
			)
		})
		form.push(<button onClick={updateUser}>Update user</button>)

		setUserData(form)
	}, [account])

	function updateUser(event) {
		event.preventDefault()
		const { username, first_name, last_name, email } = event.target.parentElement.children

		updateUserApi(username.value, first_name.value, last_name.value, email.value)
	}

	async function logout() {
		if (logoutApi()) {
			;["access", "refresh", "lastLog"].forEach((key) => storage().removeItem(key))
			sessionStorage.setItem("isLoged", false)
		} else {
			alert("couldnt log out")
		}

		router.push("/")
	}
	async function remove() {
		if (removeApi()) {
			;["access", "refresh", "lastLog", "username", "remember"].forEach((key) => storage().removeItem(key))
			sessionStorage.setItem("isLoged", false)
		} else alert("couldnt remove account")

		router.push("/")
	}
	return (
		<>
			<form>{userData}</form>
			<br />
			<br />
			<button onClick={logout}>Log out</button>
			<button onClick={remove}>delete profile</button>
			<br />
			<br />
			<Link href="./profile/address">addresses</Link>
		</>
	)
}

export default function FirstView() {
	const [ui, setUi] = useState()

	useEffect(() => {
		const isLoged = sessionStorage.getItem("isLoged") === "true" ? true : false

		if (isLoged) setUi(<Profile />)
		else setUi(<CheckExistance />)
	}, [])

	return ui
}
