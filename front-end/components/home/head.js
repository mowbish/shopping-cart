import styles from "./head.module.scss"

//components
import Brand from "./brand"
import Account from "./account"
import DarkLight from "./dark-light"

export default function Head() {
	return (
		<>
			<header className={styles.main}>
				<DarkLight />
				<Brand />
				<Account />
			</header>
		</>
	)
}
