import styles from "./Header.module.scss"
import Link from "next/link"

export default function Header() {
	return (
		<>
			<header id={styles.header}>
				im header
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/cart">cart</Link>
					</li>
					<li>
						<Link href="/compare">compare</Link>
					</li>
					<li>
						<Link href="/product">product</Link>
					</li>
					<li>
						<Link href="/profile">profile</Link>
					</li>
					<li>
						<Link href="/search">search</Link>
					</li>
				</ul>
			</header>
		</>
	)
}
