import "styles/vars.css"
import "styles/globals.css"
import "styles/custom-loader-spinner.css"
import "custom-extensions"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import { Provider } from "react-redux"
import type { AppProps } from "next/app"
import { AuthLayout } from "layout/auth-layout"
import { store } from "store"

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) => {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<AuthLayout>
					<Head>
						<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADYklEQVRoge2ay28NURzHP1X0Vom20qqFiFaJlcRO27DVtP4B1MordEHwT1hIJFJasalERKyIIB4JdS3EIzYevWWlV1T6ECS36aUWv3PS0+l9zMw5984Q3+SXOXMev8f5nedvBv4jXqhwyKse2A50AJuBFqARqFHlP4EvwEfgDZAEHgGTDnUIjQTQA9wDfgGzASkL3AX2Kl5lRzVwEkj7UNYvpYETindZ0I0MD1cGeOkD0FVKAxLA2RIa4KVBYJlrI9YAr8pohKbnQJMrI5oRd5fbCE0jSgcrNALDERphzpvQnqkmmuGUj14QcokeiIHyXuoLakR3DJTOR51+jagm2sldjEbwOcROxUDZYnS8mBFVwGgMFC1GnylylOkJwXS9atsIZAK0ywANqm1zCLl7TMUXeQzZV8jKIhgDrgeofw34aiGvJ19BPXKsDusRgPYA7dqMdmE8kgVqNQPTIzuASh89UQhJ4KWPeq+Bp5ayKpGLHDDfkHZLxtvUc8BHXb2xtRWsVRwduTJvEW4F0UPrKtJLy4GpAvWnkOtvJXBFtQ0ztGaBG1p50yOtwTpjAdYiJ4IfwOUC9QaR+/suYJ2lzI06YRqyypIpwFH17EN6LBf61bPXgbz6XJnT2A2tJPAb2KTeH+ao+0CVtaq6SfUedmhltPLefcQWFcBhlT6fo1zn9eI2FDUP49h7ZBaJU9UAi4FPRr00sAS5h0+oPFuPjGnlTY+M2/aEQi2wG9mwLhn5F4EZJIZV50jWhE6YhqQcMYe5Sd+PKJ9lbn855FDOsE6Yhrx1KGALstmlgZvIej+KbLpbHcp5pxOmIU8cCgA4op7nFJl5rjCUK7MOu0Nj0pOfQY72GqtZuMTbTPYZYKVmbnpkEln7XaEK2G+8HwCWOuR/H/imX7z7yKBDQSATu0XRQce8Cx2D/pqrbhpPAMLrkWngjK/+iBanMY4n+RD3cFCKABHHrhgonI92+jVC40IMlPaS3o8CIYF8n4haeU3PkMUoFBqA9zEwYgTZUK3QrBhFaYQZcrJCE/J9IorhZO0JL6oo/8fQkn6q7qS0Qy1FiCU2LBJIaN/lcWYUOEZEf0BUIVfXO4S7AmSB20hkPfTSCm4jGbXM/6lmA7J8r1Dl35Hoewq52Q0BjzGO4v/xL+EP5zk1VeU+FGQAAAAASUVORK5CYII=" />
						<title>Monumentum-admin</title>
					</Head>
					<Component {...pageProps} />
				</AuthLayout>
			</Provider>
		</SessionProvider>
	)
}

export default App