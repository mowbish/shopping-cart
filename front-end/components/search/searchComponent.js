import styles from "./searchComponent.module.scss"
import { useSelector } from "react-redux"

export default function SearchComponent({ name }) {
	let pageStatus = useSelector((state) => state.pageStatus)

	return (
		<>
			<div
				className={styles.main}
				style={pageStatus.status === "store" ? { display: "block" } : { display: "none" }}
			>
				{name}
			</div>
		</>
	)
}
