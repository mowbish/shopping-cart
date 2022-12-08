import styles from "./product.module.scss"
import Image from "next/image"

export default function Product({ imageSource, productText }) {
	return (
		<>
			<div className={styles.product}>
				<Image src={imageSource} width="100px" height="100px" />
				<p>{productText}</p>
			</div>
		</>
	)
}
