import "bootstrap/dist/css/bootstrap.css"
import "../styles/fontawesome.min.css"
import "../styles/slick-theme.min.css"
import "../styles/slick.min.css"
import "../styles/templatemo.min.css"
import Head from "next/head"
import allStore from "/data/allStore"
import { Provider } from "react-redux"
import Layout from "../components/layout"
import { useEffect } from "react"
import { storage } from "../functions/main"
import { updateToken } from "../functions/api/account"

export default function MyApp({ Component, pageProps }) {
	// check (and set) being loged or not (in first load)
	useEffect(() => {
		const now = new Date().getTime()
		const lastLog = storage().getItem("lastLog")
		const timeLimit = 3420000

		if (lastLog == null || lastLog == undefined) {
			sessionStorage.setItem("isLoged", false)
		} else {
			if (now - lastLog >= timeLimit) {
				const username = storage().getItem("username")
				sessionStorage.setItem("username", username)
				sessionStorage.setItem("isLoged", false)
			} else {
				sessionStorage.setItem("isLoged", true)

				const updateAfter = timeLimit - (now - lastLog) - 300000
				if (updateAfter > 120000) setTimeout(() => updateToken(storage().getItem("refresh")), updateAfter)
				else updateToken(storage().getItem("refresh"))
			}
		}
	}, [])

	return (
		<>
			<Provider store={allStore}>
				<Head>
					<meta charSet="UTF-8" />
					<meta name="robots" content="index, follow" />
					<meta name="description" content="Sadra yavarzadeh's pesonal page" />
					<meta
						name="keywords"
						content="sadra, yavar, yavarzadeh, herisi, sadrayavar, Sadra, Yavar, Yavarzadeh, Herisi, SadraYavar, Sadrayavar"
					/>
					<meta name="author" content="Sadra Yavar" />
					<meta name="Resource-type" content="Document" />
					<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
					<title>Sadra Yavar</title>
				</Head>

				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}
