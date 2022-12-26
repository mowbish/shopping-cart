import "/components/globals.scss"
import Head from "next/head"
import allStore from "/data/allStore"
import { Provider } from "react-redux"
import { useRouter } from "next/router"
import { UserProvider } from "@auth0/nextjs-auth0/client"

// components
import Cursor from "/components/cursor"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

export default function MyApp({ Component, pageProps }) {
	const router = useRouter()
	// console.log( router.query.productID)
	return (
		<>
			<UserProvider>
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
					<Header />
					<Component {...pageProps} />
					<Footer />
					<Cursor />
				</Provider>
			</UserProvider>
		</>
	)
}
