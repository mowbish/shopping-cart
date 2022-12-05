import { configureStore } from "@reduxjs/toolkit"
import pageStatus from "./pageStatus"

const allStore = configureStore({
	reducer: { pageStatus },
	devTools: process.env.NODE_ENV !== "production",
})

export default allStore
