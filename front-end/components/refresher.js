export default function refresher(refresh) {
	// save data in object to stringify
	const data = {
		refresh,
	}

	// fetch data
	let root = window.location.origin
	if (process.env.NODE_ENV !== "production")
		root = window.location.origin.replace("3", "8")
	fetch(`${root}/api/user-address`, {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((res) => {
			if (res.ok) return res.json()
		})
		.then((data) => updateToken(data))
		.catch((err) => console.error(err))
}

function updateToken(data) {
	localStorage.setItem("access", data.access)
	localStorage.setItem("refresh", data.refresh)
}
