import Link from "next/link"

export default function Signup({ submitHandler, inputList, checkbox, setCheckbox }) {
	return (
		<>
			<form onSubmit={submitHandler}>
				{inputList}
				<br />
				<input
					type="checkbox"
					checked={checkbox}
					onChange={() => setCheckbox((prev) => !prev)}
					id="rememberSignCheck"
				/>
				<label htmlFor="rememberSignCheck">Remember me</label>
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
