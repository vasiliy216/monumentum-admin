import { ReactNode, useEffect } from "react"
import Router from "next/router"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { Loader } from "components/shared/loader"
// import { useLoadUserInfo } from "hooks/use-load-user-info"
// import { useAppSelector } from "hooks/redux"

type AuthLayoutType = {
	children: ReactNode
}

const ROUTE = /login/

export const AuthLayout = ({ children }: AuthLayoutType) => {
	const { data: session, status } = useSession()
	const { pathname } = useRouter()
	console.log("session", session)
	console.log("status", status)

	useEffect(() => { process.env.NEXTAUTH_URL = window.location.origin }, [])

	// useLoadUserInfo(session?.user?.email as string)

	if (status === "loading") { return <Loader /> }
	else if (status === "unauthenticated" && !ROUTE.test(pathname)) { Router.push("/login") }

	return <div>{children}</div>
}
