import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "types"


const initialState: User = {
	email: "",
	userName: ""
}

export const userSlice = createSlice({
	name: "user-info",
	initialState,
	reducers: {
		setUserInfo: (_, action: PayloadAction<User>) => action.payload
	}
})

export const { setUserInfo } = userSlice.actions

export const userInfoReducer = userSlice.reducer