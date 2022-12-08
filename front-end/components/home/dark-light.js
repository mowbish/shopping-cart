import styles from "./dark-light.module.scss"
import { useEffect } from "react"

export default function DarkLight() {
	useEffect(() => {
		const htmlElem = document.getElementsByName("html")[0]
		const body = document.body
		const themeSwitch = document.getElementById("themeSwitch")

		const themeClickhandler = () => {
			if (body.style.color == "black") {
				body.style.color = "white"
				body.style.background = "black"
				// htmlElem.style.colorScheme = "dark"
			} else {
				body.style.color = "black"
				body.style.background = "white"
				// htmlElem.style.colorScheme = "light"
			}
		}

		themeSwitch.addEventListener("click", themeClickhandler)
		return () => themeSwitch.removeEventListener("click", themeClickhandler)
	}, [])

	return (
		<>
			<div id="themeSwitch" className={styles.main}>
				<svg
					width="225"
					height="55"
					viewBox="0 0 225 55"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<ellipse cx="28.5" cy="27.5" rx="28.5" ry="27.5" fill="#D9D9D9" />
					<ellipse cx="196.5" cy="27.5" rx="28.5" ry="27.5" fill="#D9D9D9" />
					<rect x="33" y="20" width="164" height="16" fill="#D9D9D9" />
				</svg>
			</div>
		</>
	)
}
