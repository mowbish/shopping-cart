import { configureStore } from "@reduxjs/toolkit"
import window from "./window"
import compare from "./compare"

const allStore = configureStore({
	reducer: { window, compare },
	devTools: process.env.NODE_ENV !== "production",
})

export default allStore
