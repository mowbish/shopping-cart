// import styles from "./closeButton.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//data
import { setState } from "/data/pageStatus"
//components
import changeSearchStyleTo from "../moveSearch"

export default function Search() {
	const dispatch = useDispatch()
	let pageStatus = useSelector((state) => state.pageStatus)

	// move function
	useEffect(() => {
		const goToHomeFromStore = () => {
			if (pageStatus.status !== "store") return // break if store is not active
			changeSearchStyleTo("home")
			document.getElementById("home").scrollIntoView()
			dispatch(setState("home"))
		}

		// event handelling
		const closeElem = document.getElementById("closeSearch")
		closeElem.addEventListener("click", goToHomeFromStore)
		return () => closeElem.removeEventListener("click", goToHomeFromStore)
	}, [pageStatus])

	return (
		<>
			<button
				id="closeSearch"
				style={pageStatus.status === "store" ? { display: "block" } : { display: "none" }}
			>
				Close
			</button>
		</>
	)
}
