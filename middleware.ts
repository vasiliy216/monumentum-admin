import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	console.log("test")
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set("test", "hello")

	const response = NextResponse.next({
		request: {
			headers: requestHeaders
		}
	})

	return response
}