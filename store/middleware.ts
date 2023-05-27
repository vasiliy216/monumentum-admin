import logger from "redux-logger"
import thunk from "redux-thunk"

export const getMiddlewares = () => {
	const middlewares = [thunk]
	if (process.env.NODE_ENV === "development") {
		return [...middlewares, logger]
	}
	return middlewares
}