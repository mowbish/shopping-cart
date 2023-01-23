import { configureStore } from "@reduxjs/toolkit"
import window from "./window"
import compare from "./compare"
import user from "./user"

const allStore = configureStore({
	reducer: { window, compare, user },
	devTools: process.env.NODE_ENV !== "production",
})

export default allStore
