export default function changeSearchStyleTo(state) {
	const temp = document.getElementById("searchContainer")

	switch (state) {
		case "home":
			temp.style.width = "50%"
			temp.style.top = "90%"
			temp.style.left = "50%"
			temp.style.transform = "translateX(-25%)"
			break

		case "store":
			temp.style.width = "100%"
			temp.style.top = "0"
			temp.style.left = "0"
			temp.style.transform = "translateX(0)"
			break

		case "cart":
			temp.style.width = "100%"
			temp.style.top = "100%"
			temp.style.left = "0"
			temp.style.transform = "translateY(-100%)"
			break

		default:
			break
	}
}
