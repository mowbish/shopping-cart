import styles from "./search.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//components
import SearchComponent from "./searchComponent"
//data
import { setState } from "/data/pageStatus"

export default function Search() {
	const dispatch = useDispatch()
	let pageStatus = useSelector((state) => state.pageStatus)

	useEffect(() => {
		const searchElem = document.getElementById("searchContainer")

		const clickhandler = () => {
			// go to store
			if (pageStatus.status == "home") {
				window.scroll(0, window.scrollY + window.innerHeight)
				dispatch(setState("store"))
			}
			// go to home
			else {
				window.scroll(0, window.scrollY - window.innerHeight)
				dispatch(setState("home"))
			}
		}

		document.getElementById("searchInput").addEventListener("click", clickhandler)
		return () =>
			document.getElementById("searchInput").removeEventListener("click", clickhandler)
	}, [pageStatus])

	return (
		<>
			<div
				id="searchContainer"
				className={styles.main}
				style={
					pageStatus.status === "home"
						? {
								top: "90%",
								left: "50%",
								transform: "translateX(-50%)",
						  }
						: {
								top: "0",
								left: "0",
								width: "90%",
								transform: "translateX(0)",
						  }
				}
			>
				<input id="searchInput" placeholder="Search store" />
				<button />
				<SearchComponent name="price" />
			</div>
		</>
	)
}
