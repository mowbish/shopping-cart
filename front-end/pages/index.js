import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//data
import { setWidth, setHeight } from "../data/pageStatus"

export default function Home(props) {
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
			{props.products.map((product) => {
				return (
					<Link href={`/product/${product.id}`} key={product.id}>
						<div style={{ border: "1px solid white", width: "33%" }}>
							<Image
								src={product.image}
								width="100px"
								height="100px"
								alt={product.name}
							/>
							<h1>{product.name}</h1>
						</div>
					</Link>
				)
			})}
		</>
	)
}

export async function getStaticProps() {
	const res = await fetch("https://rickandmortyapi.com/api/character")
	const data = await res.json()
	const dataArray = await data.results
	return {
		props: {
			products: dataArray,
		},
		revalidate: 3600,
	}
}
