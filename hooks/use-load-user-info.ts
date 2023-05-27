import { useCallback, useEffect } from "react"
import { useAppDispatch } from "hooks/redux"
import { setUserInfo } from "store"
import { User } from "types"

export const useLoadUserInfo = async (user: User) => {
	const dispatch = useAppDispatch()
	const loadUserInfoHandle = useCallback(async () => {
		if (user) { dispatch(setUserInfo(user)) }
	}, [dispatch, user])
	useEffect(() => { loadUserInfoHandle() }, [loadUserInfoHandle])
}