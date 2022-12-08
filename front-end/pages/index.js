import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setState } from "/data/pageStatus"

//components
import WebHead from "/components/home/head"
import Body from "/components/store/body"
import Search from "/components/search/search"
import Cursor from "/components/cursor"

export default function Home() {
	const dispatch = useDispatch()

	return (
		<>
			<Cursor />

			<Search />

			<WebHead />
			<Body />
		</>
	)
}
