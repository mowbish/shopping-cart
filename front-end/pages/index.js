import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//components
import WebHead from "/components/home/head"
import Body from "/components/store/body"
import Cart from "/components/cart/cart"
import Cursor from "/components/cursor"
//data
import { setWidth, setHeight } from "../data/pageStatus"

export default function Home() {
	const dispatch = useDispatch()
	const height = useSelector((state) => state.pageStatus.height)
	const pageStatus = useSelector((state) => state.pageStatus.status)

	// upload size
	useEffect(() => {
		document.body.onresize = () => {
			dispatch(setHeight(window.innerHeight))
			dispatch(setWidth(window.innerWidth))
		}
	}, [])

	// resize handler
	useEffect(() => {
		document.children[0].style.scrollBehavior = "auto"

		if (pageStatus === "home") window.scrollTo(0, 0)
		else if (pageStatus === "store") window.scrollTo(0, window.innerHeight)
		else if (pageStatus === "cart") window.scrollTo(0, 2 * window.innerHeight)

		document.children[0].style.scrollBehavior = "smooth"
	}, [height])

	return (
		<>
			<Cursor />

			<WebHead />
			<Body />
			<Cart />
		</>
	)
}
