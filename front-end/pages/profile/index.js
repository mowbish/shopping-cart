import Link from "next/link"

export default function Profile() {
	return (
		<>
			<Link href="./profile/login">Login</Link>
			<br />
			<Link href="./profile/sign-up">Sign Up</Link>
			<br />
			<Link href="./profile/address">Address</Link>
		</>
	)
}
