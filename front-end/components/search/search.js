import styles from "./search.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//data
import { setState } from "/data/pageStatus"
//components
import SearchComponent from "./searchComponent"

export default function Search() {
	const dispatch = useDispatch()
	let pageStatus = useSelector((state) => state.pageStatus)

	useEffect(() => {
		const searchElem = document.getElementById("searchInput")
		const closeElem = document.getElementById("closeSearch")

		const goToStoreFromHome = () => {
			if (pageStatus.status == "store") return
			window.scroll(0, window.scrollY + window.innerHeight)
			dispatch(setState("store"))
		}
		const goToHomeFromStore = () => {
			console.log("close clicked")
			if (pageStatus.status == "home") return
			window.scroll(0, window.scrollY - window.innerHeight)
			dispatch(setState("home"))
		}

		searchElem.addEventListener("click", goToStoreFromHome)
		closeElem.addEventListener("click", goToHomeFromStore)
		return () => {
			searchElem.removeEventListener("click", goToStoreFromHome)
			closeElem.removeEventListener("click", goToHomeFromStore)
		}
	}, [pageStatus])

	return (
		<>
			<div
				id="searchContainer"
				className={styles.container}
				style={
					pageStatus.status === "home"
						? {
								width: "50%",
								top: "90%",
								left: "50%",
								transform: "translateX(-25%)",
						  }
						: {
								width: "100%",
								top: "0",
								left: "0",
								transform: "translateX(0)",
						  }
				}
			>
				<input id="searchInput" placeholder="Search store" />
				<SearchComponent name="price" />
				<button
					id="closeSearch"
					style={
						pageStatus.status === "store" ? { display: "block" } : { display: "none" }
					}
				>
					Close
				</button>
			</div>
		</>
	)
}
