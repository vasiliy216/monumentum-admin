import "styles/vars.css"
import "styles/globals.css"
import "styles/custom-loader-spinner.css"
import "custom-extensions"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import type { AppProps } from "next/app"
import { AuthLayout } from "layout/auth-layout"
import { store } from "store"

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<AuthLayout>
					<Head>
						<title>Monumentum-admin</title>
					</Head>
					<Component {...pageProps} />
				</AuthLayout>
			</Provider>
		</SessionProvider>
	)
}

export default App