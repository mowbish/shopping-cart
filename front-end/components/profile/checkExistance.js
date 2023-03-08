import Link from "next/link"

export default function CheckExistance({ userData, updateUser, logout, remove }) {
	return (
		<>
			<form>
				{userData}
				<button onClick={updateUser}>Update user</button>
			</form>
			<br />
			<br />
			<button onClick={logout}>Log out</button>
			<button onClick={remove}>delete account</button>
			<br />
			<br />
			<Link href="./profile/address">addresses</Link>
		</>
	)
}
