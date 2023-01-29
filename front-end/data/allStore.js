import { configureStore } from "@reduxjs/toolkit"
import window from "./window"
import user from "./user"

const allStore = configureStore({
	reducer: { window, user },
	devTools: process.env.NODE_ENV !== "production",
})

export default allStore
