import styles from "./search.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

//components
import SearchComponent from "./searchComponent"
import Log from "../1-head/account"

//data
import { setState } from "/data/pageStatus"

export default function Search() {
	const dispatch = useDispatch()
	const pageStatus = useSelector((state) => state.as)

	dispatch(setState(15))
	console.log("##########done")
	function clickHandler() {
		useEffect(() => {
			window.scroll(window.scrollX, window.scrollY + window.innerHeight)
		}, [])
	}

	return (
		<>
			<div className={styles.main}>
				<input placeholder="This is search" onClick={clickHandler} />
				<button />
				<SearchComponent name="price" />
			</div>
		</>
	)
}
