import styles from "./cart.module.scss"
import LeaveCart from "./leaveCartButton"

export default function Cart() {
	return (
		<>
			<main id="cart" className={styles.cart}>
				<LeaveCart />
			</main>
		</>
	)
}
