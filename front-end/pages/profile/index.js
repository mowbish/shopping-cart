import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { setAccountDb } from "../../data/user"
import { storage } from "../../functions/main"
import { useEffect, useState } from "react"
import Link from "next/link"
import LoginComp from "../../components/profile/login"
import CheckExistanceComp from "../../components/profile/checkExistance"
import SingupComp from "../../components/profile/signup"
import Input from "../../components/misc/input"
import {
	loginApi,
	signupApi,
	userExistApi,
	logoutApi,
	removeUserApi,
	getUserApi,
	updateUserApi,
} from "../../functions/account"

function Login({ username }) {
	const router = useRouter()
	const [checkbox, setCheckbox] = useState(true)
	const database = useDispatch()

	async function submitHandler(event) {
		event.preventDefault()
		const { username, password, rememberLoginCheck } = event.target.children

		const result = await loginApi(username.value, password.value, rememberLoginCheck.checked)

		if (result == true) router.push("/")
	}
	const rememberHandler = () => setCheckbox((prev) => !prev)
	return (
		<LoginComp
			submitHandler={submitHandler}
			username={username}
			checkbox={checkbox}
			rememberHandler={rememberHandler}
		/>
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

	async function submitHandler(event) {
		event.preventDefault()
		const { username, first_name, last_name, email, password, passwordRepeat, rememberSignCheck } =
			event.target.children
		const data = {
			username: username.value,
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			password: password.value,
			passwordRepeat: passwordRepeat.value,
			remember: rememberSignCheck.checked,
		}

		const result = await signupApi(data)

		if (result == true) router.push("/")
	}

	return (
		<SingupComp submitHandler={submitHandler} inputList={inputList} checkbox={checkbox} setCheckbox={setCheckbox} />
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

					const doesExist = await userExistApi(username)
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
			if (account.username !== undefined) return

			const newAccount = await getUserApi()
			if (newAccount.is_active == true) {
				delete newAccount.is_active
				database(setAccountDb(newAccount))
			}
		}
		temp()
	}, [])

	// set new data in ui when the data changes
	useEffect(() => {
		let i = 0
		const form = Object.entries(account).map((key) => {
			return (
				<>
					<Input
						key={`uniqueKeyForUserDataInput-${++i}`}
						label={key[0]}
						required="required"
						name={key[0]}
						placeHolder={key[0]}
						value={key[1]}
					/>
					<br />
				</>
			)
		})

		setUserData(form)
	}, [account])

	function updateUser(event) {
		event.preventDefault()
		const { username, first_name, last_name, email } = event.target.parentElement.children
		const dataObj = {
			username: username.value,
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
		}

		updateUserApi(dataObj)
	}

	async function logout() {
		const result = await logoutApi()
		if (result == true) router.push("/")
		else alert("couldnt log out")
	}

	async function remove() {
		if (await removeUserApi()) {
			;["access", "refresh", "lastLog", "username", "remember"].forEach((key) => storage().removeItem(key))
			sessionStorage.setItem("isLoged", false)

			database(setAccountDb({ username: undefined }))

			router.push("/")
		} else alert("couldnt remove account")
	}
	return <CheckExistanceComp userData={userData} updateUser={updateUser} logout={logout} remove={remove} />
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
