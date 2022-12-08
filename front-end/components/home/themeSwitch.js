import styles from "./themeSwitch.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//data
import { setTheme } from "/data/pageStatus"

export default function DarkLight() {
	const dispatch = useDispatch()
	const themeState = useSelector((state) => state.pageStatus.theme)

	useEffect(() => {
		const htmlElem = document.getElementsByName("html")[0]
		const body = document.body
		const themeSwitch = document.getElementById("themeSwitch")

		const themeClickhandler = () => {
			if (body.style.color == "black") {
				body.style.color = "white"
				body.style.background = "black"
				// htmlElem.style.colorScheme = "dark"
				dispatch(setTheme("dark"))
			} else {
				body.style.color = "black"
				body.style.background = "white"
				// htmlElem.style.colorScheme = "light"
				dispatch(setTheme("light"))
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
