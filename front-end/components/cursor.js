import { useEffect } from "react"
import styles from "./cursor.module.scss"

export default function Cursor() {
	const cursorDimension = 32,
		cursorColor = "white"

	//adding event listeners
	useEffect(() => {
		const cursor = window.document.getElementById(styles.cursor)

		function mouseMoveHandler(event) {
			cursor.style.left = `${event.clientX}px`
			cursor.style.top = `${event.clientY}px`
		}

		window.document.body.addEventListener("mousemove", mouseMoveHandler)
		return () => window.document.body.removeEventListener("mousemove", mouseMoveHandler)
	})

	return (
		<>
			<div id={styles.cursor}>
				<svg
					style={{
						top: -cursorDimension / 2,
						left: -cursorDimension / 2,
					}}
					xmlns="http://www.w3.org/2000/svg"
					width={cursorDimension}
					height={cursorDimension}
					viewBox={`0 0 ${cursorDimension} ${cursorDimension}`}
				>
					<circle
						cx={cursorDimension / 2}
						cy={cursorDimension / 2}
						r={cursorDimension / 2 - 1}
						fill="none"
						stroke={cursorColor}
						strokeWidth="1.5"
						strokeOpacity="1"
					/>
				</svg>
			</div>
		</>
	)
}
