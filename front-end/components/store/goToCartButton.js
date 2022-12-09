import styles from "./goToCartButton.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import changeSearchStyleTo from "../moveSearch"
//data
import { setState } from "../../data/pageStatus"

export default function CartButton() {
	const dispatch = useDispatch()
	const pageStatus = useSelector((state) => state.pageStatus.status)

	useEffect(() => {
		const goToCartFromStore = () => {
			if (pageStatus != "store") return // break if store is not active
			changeSearchStyleTo("cart")
			document.getElementById("cart").scrollIntoView()
			dispatch(setState("cart"))
		}

		const elem = document.getElementsByClassName(styles.button)[0]
		elem.addEventListener("click", goToCartFromStore)
		return () => elem.removeEventListener("click", goToCartFromStore)
	})

	return (
		<>
			<div className={styles.button}>finalize payment</div>
		</>
	)
}
