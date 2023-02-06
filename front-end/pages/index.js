import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import PageIndex from "../components/pageIndex"

export default function Home(props) {
	const dispatch = useDispatch()

	useEffect(() => {
		if (sessionStorage.getItem("firstLoad") == "true") return
		sessionStorage.setItem("firstLoad", true)
		console.log("first load")

		const lastLoged = localStorage.getItem("lastLoged")
		const currentTime = new Date().getTime()

		if (lastLoged !== undefined && lastLoged !== null) {
			const pastTime = currentTime - lastLoged

			if (pastTime <= 3300000) sessionStorage.setItem("isLoged", true)
			else sessionStorage.setItem("isLoged", false)

			console.log("set first load")
		}
	}, [])

	return <PageIndex />
}
