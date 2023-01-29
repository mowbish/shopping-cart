import styles from "./Header.module.scss"
import Link from "next/link"

export default function Header() {
	return (
		<>
			<header id={styles.header}>
				<div>
					<Link href="/">Logo</Link>
				</div>

				<ul>
					<li>
						<Link href="/profile">profile</Link>
					</li>
					<li>
						<Link href="/profile">profile</Link>
					</li>
					<li>
						<Link href="/profile">profile</Link>
					</li>
					<li>
						<Link href="/login">Login / Signup</Link>
					</li>
				</ul>
			</header>
		</>
	)
}
