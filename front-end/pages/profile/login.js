import Link from "next/link"
export default function Login() {
	const formSubmitHandler = (event) => {
		event.preventDefault()
		console.log(event.target)

		console.log()
		fetch(`${window.location.origin}/api/`)
	}

	return (
		<>
			<form method="post" onSubmit={formSubmitHandler}>
				<label for="uname">
					<b>Username</b>
				</label>
				<input type="text" placeholder="Enter Username" name="uname" required />

				<label for="psw">
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="psw" required />

				<button type="submit">Login</button>
				<label>
					<input type="checkbox" checked="checked" name="remember" /> Remember me
				</label>
				<span class="psw">
					Forgot <Link href="./forgot">password?</Link>
				</span>
			</form>
			<form onSubmit={formSubmitHandler}>
				<label htmlFor="email">
					<b>Email</b>
				</label>
				<input type="text" placeholder="Enter Email" name="email" required />

				<label htmlFor="psw">
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="psw" required />

				<label htmlFor="psw-repeat">
					<b>Repeat Password</b>
				</label>
				<input type="password" placeholder="Repeat Password" name="psw-repeat" required />

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
			<Link href="/api/auth/login">Loginnnn</Link>
			<br />
			<br />
			<Link href="/api/auth/logout">Logout</Link>
		</>
	)
}
