import styles from "./leaveCartButton.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import changeSearchStyleTo from "../moveSearch"
//data
import { setState } from "../../data/pageStatus"

export default function LeaveCart() {
	const dispatch = useDispatch()
	const pageStatus = useSelector((state) => state.pageStatus.status)

	useEffect(() => {
		const goToStoreFromCart = () => {
			if (pageStatus !== "cart") return // break if cart is not active
			changeSearchStyleTo("store")
			document.getElementById("store").scrollIntoView()
			dispatch(setState("store"))
		}

		const elem = document.getElementsByClassName(styles.button)[0]
		elem.addEventListener("click", goToStoreFromCart)
		return () => elem.removeEventListener("click", goToStoreFromCart)
	})

	return (
		<>
			<div className={styles.button}>leaveCart</div>
		</>
	)
}
