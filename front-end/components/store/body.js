import styles from "./body.module.scss"
import Product from "./product"

export default function Body() {
	//test products
	const array = []
	for (let i = 0; i < 50; i++) array[i] += i
	const newArray = array.map(() => (
		<Product imageSource={"/Untitled.png"} productText={"qwertyuiop"} />
	))

	return (
		<>
			<main className={styles.main}>
				<div className={styles.productContainer}>{newArray}</div>
			</main>
		</>
	)
}
