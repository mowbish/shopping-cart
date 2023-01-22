import Link from "next/link"
import Image from "next/image"
import { useDispatch } from "react-redux"
//data
import { addItem, removeItem } from "../data/compare"

export default function Home(props) {
	const dispatch = useDispatch()

	const updateCompareList = (e) => {
		const temp = ""
		for (let i = 10; i < e.target.parentNode.id.length; i++)
			temp += e.target.parentNode.id[i]

		e.target.checked ? dispatch(addItem(temp)) : dispatch(removeItem(temp))
	}

	return (
		<>
			{props.products.map((product) => {
				return (
					<div
						id={`productId-${product.id}`}
						style={{ border: "1px solid white", width: "33%" }}
						key={product.id}
					>
						<Link href={`/product/${product.id}`}>
							<Image
								src={product.image}
								width="100px"
								height="100px"
								alt={product.name}
							/>
						</Link>
						<Link href={`/product/${product.id}`}>
							<h1>{product.name}</h1>
						</Link>
						<input type="checkbox" name="remember" onChange={updateCompareList} />
					</div>
				)
			})}
		</>
	)
}

export async function getStaticProps() {
	// const res = await fetch("")
	// const data = await res.json()
	// const dataArray = await data.results
	return {
		props: {
			products: [],
		},
		revalidate: 3600,
	}
}
