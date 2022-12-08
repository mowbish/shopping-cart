import styles from "./head.module.scss"
import { useSelector } from "react-redux"
//components
import Brand from "./brand"
import Account from "./account"
import ThemeSwitch from "./themeSwitch"

export default function Head() {
	return (
		<>
			<header className={styles.home}>
				<ThemeSwitch />
				<Brand />
				<Account />
			</header>
		</>
	)
}
