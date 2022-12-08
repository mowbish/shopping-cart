import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setState } from "/data/pageStatus"

//components
import WebHead from "/components/1-head/head"
import Body from "/components/4-body/body"
import Search from "/components/search/search"
import Cursor from "/components/cursor"

export default function Home() {
	const dispatch = useDispatch()

	useEffect(() => {
		const scrollHandler = () => {
			dispatch(setState(false))
		}

		window.addEventListener("scroll", scrollHandler)
		return () => window.removeEventListener("scroll", scrollHandler)
	}, [])

	return (
		<>
			<Cursor />

			<Search />

			<WebHead />
			<Body />
		</>
	)
}
