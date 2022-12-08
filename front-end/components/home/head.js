import styles from "./head.module.scss"

//components
import Brand from "./brand"
import Account from "./account"
import ThemeSwitch from "./themeSwitch"

export default function Head() {
	return (
		<>
			<header className={styles.main}>
				<ThemeSwitch />
				<Brand />
				<Account />
			</header>
		</>
	)
}
