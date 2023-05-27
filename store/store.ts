import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import {
	userInfoReducer
} from "./reducers"
import { getMiddlewares } from "./middleware"


export function makeStore() {
	return configureStore({
		reducer: {
			userInfo: userInfoReducer
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: getMiddlewares()
	})
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>