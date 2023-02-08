export function root() {
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")

	return root
}
export function storage() {
	return localStorage.getItem("remember") === "true"
		? localStorage
		: sessionStorage
}
