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
				<input />
			</header>
			<div style={{ scrollSnapType: "y mandatory" }} dir="ltr">
				<div style={{ scrollSnapAlign: "center", height: "100vh" }}>2</div>
				<div style={{ scrollSnapAlign: "center", height: "100vh" }}>3</div>
				<div style={{ scrollSnapAlign: "center", height: "100vh" }}>4</div>
				<div style={{ scrollSnapAlign: "center", height: "100vh" }}>5</div>
			</div>
		</>
	)
}
