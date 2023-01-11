import Link from "next/link"
export default function Login() {
	const formSubmitHandler = (event) => {
		event.preventDefault()
		fetch(`${window.location.origin}/api/`)
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				<label htmlFor="uname">
					<b>Username</b>
				</label>
				<input type="text" placeholder="Enter Username" name="uname" required />

				<label htmlFor="psw">
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="psw" required />

				<label>
					<input type="checkbox" checked="checked" name="remember" /> Remember me
				</label><br/>
				<span className="psw">
					Forgot <Link href="./forgot">password?</Link>
				</span>
                <br/>
				<button type="submit">Login</button>
			</form>
		</>
	)
}
