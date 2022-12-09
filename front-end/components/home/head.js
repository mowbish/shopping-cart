import styles from "./head.module.scss"
//components
import Brand from "./brand"
import Account from "./account"
import ThemeSwitch from "./themeSwitch"
import Search from "/components/search/search"

export default function Head() {
	return (
		<>
			<header id="home" className={styles.home}>
				<ThemeSwitch />
				<Brand />
				<Account />
				<Search />
			</header>
		</>
	)
}
