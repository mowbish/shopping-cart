import "bootstrap/dist/css/bootstrap.css"
import "../styles/fontawesome.min.css"
import "../styles/slick-theme.min.css"
import "../styles/slick.min.css"
import "../styles/templatemo.min.css"
import Head from "next/head"
import allStore from "/data/allStore"
import { Provider } from "react-redux"
import Layout from "../components/layout"

export default function MyApp({ Component, pageProps }) {
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
					<meta
						name="viewport"
						content="width=device-width, height=device-height, initial-scale=1.0"
					/>
					<title>Sadra Yavar</title>
				</Head>

				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	)
}
