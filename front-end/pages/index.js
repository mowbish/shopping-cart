import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setIsLoged, setUsername } from "../data/user"
import { updateToken } from "../functions/api/account"

import PageIndex from "../components/pageIndex"

export default function Home() {
	const database = useDispatch()

	useEffect(() => {
		const now = new Date().getTime()
		const lastLog = localStorage.getItem("lastLog")
		const timeLimit = 3420000

		if (lastLog == null) {
			database(setIsLoged(false))
		} else {
			if (now - lastLog >= timeLimit) {
				const username = localStorage.getItem("username")
				database(setUsername(username))
				database(setIsLoged(false))
			} else {
				database(setIsLoged(true))

				const updateAfter = timeLimit - (now - lastLog) - 300000
				if (updateAfter > 120000)
					setTimeout(() => updateToken(localStorage.getItem("refresh")), updateAfter)
				else updateToken(localStorage.getItem("refresh"))
			}
		}
	}, [])

	return <PageIndex />
}
