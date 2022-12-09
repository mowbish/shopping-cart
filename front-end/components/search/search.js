import styles from "./search.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//data
import { setState } from "/data/pageStatus"
//components
import SearchComponent from "./searchComponent"
import changeSearchStyleTo from "../moveSearch"
import CloseButton from "./closeButton"

export default function Search() {
	const dispatch = useDispatch()
	let pageStatus = useSelector((state) => state.pageStatus)

	useEffect(() => {
		const goToStoreFromHome = () => {
			if (pageStatus.status !== "home") return // break if home is not active
			changeSearchStyleTo("store")
			document.getElementById("store").scrollIntoView()
			dispatch(setState("store"))
		}

		// event handelling
		const searchElem = document.getElementById("searchInput")
		searchElem.addEventListener("click", goToStoreFromHome)
		return () => searchElem.removeEventListener("click", goToStoreFromHome)
	}, [pageStatus])

	return (
		<>
			<div id="searchContainer" className={styles.container}>
				<input id="searchInput" placeholder="Search store" />
				<SearchComponent name="type" />
				<CloseButton />
			</div>
		</>
	)
}
