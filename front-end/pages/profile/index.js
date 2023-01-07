import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import Image from "next/image"

export default function Profile() {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>

	return (
		<>
			<Link href="./profile/login">login</Link>
			<br />
			<br />
			{user && (
				<div>
					<Image src={user.picture} alt={user.name} />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
			)}
		</>
	)
}
