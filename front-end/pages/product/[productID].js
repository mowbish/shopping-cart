import { useRouter } from "next/router"

export default function ProductID(props) {
	const router = useRouter()

	return (
		<>
			<h1>im a unique product</h1>
			<h2>my name is: {props.product.name}</h2>
			<h2>my status is: {props.product.status}</h2>
			<h2>my specie is: {props.product.species}</h2>
			<h2>my gender is: {props.product.gender}</h2>
		</>
	)
}

export async function getStaticProps(context) {
	// console.log(context.params.productID)

	const res = await fetch(
		`https://rickandmortyapi.com/api/character/${context.params.productID}`
	)
	const data = await res.json()

	return {
		props: {
			product: data,
		},
	}
}
export async function getStaticPaths() {
	const pathArray = [{ params: { productID: "21" } }]
	return { fallback: true, paths: pathArray }
}
