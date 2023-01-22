import styles from "./Header.module.scss"
import Link from "next/link"

export default function Header() {
	return (
		<>
			<header id={styles.header}>
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/profile">profile</Link>
					</li>
				</ul>
			</header>
		</>
	)
}
