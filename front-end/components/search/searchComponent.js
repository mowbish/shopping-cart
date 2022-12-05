import styles from "./searchComponent.module.scss"

export default function SearchComponent({ name }) {
	return (
		<>
			<div className={styles.main}> {name}</div>
		</>
	)
}
