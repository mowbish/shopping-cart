import Input from "../misc/input"

export default function Login({ submitHandler, username, checkbox, rememberHandler }) {
	return (
		<>
			<div>
				<div>
					<form onSubmit={submitHandler}>
						<Input
							label="username"
							placeHolder="enter your username"
							name="username"
							type="text"
							value={username}
							required
						/>
						<br />
						<Input label="Password" placeHolder="enter your password" name="password" type="password" required />
						<br />
						<input type="checkbox" checked={checkbox} onChange={rememberHandler} id="rememberLoginCheck" />
						<label htmlFor="rememberLoginCheck">Remember me</label>
						<br />

						<button type="submit">Log In</button>
					</form>
				</div>
			</div>
		</>
	)
}
