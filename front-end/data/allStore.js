import { configureStore } from "@reduxjs/toolkit"
import auth from "./auth"
import window from "./window"
import compare from "./compare"

const allStore = configureStore({
	reducer: { auth, window, compare },
	devTools: process.env.NODE_ENV !== "production",
})

export default allStore
