import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import Image from "next/image"

export default function Profile() {
	return (
		<>
			<Link href="./profile/login">Login</Link>
			<br />
			<Link href="./profile/sign-up">Sign Up</Link>
		</>
	)
}
