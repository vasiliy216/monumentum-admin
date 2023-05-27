import { notification } from "antd"

const showNotification = (type: string, title: string, message: string) => {
	notification[type as keyof typeof notification]({
		message: title,
		description: <span dangerouslySetInnerHTML={{ __html: message }} />,
		placement: "bottomLeft"
	})
}

export const showErrorNotification = (message: string) => {
	showNotification("error", "Error", message)
}

export const showWarningNotification = (message: string) => {
	showNotification("warning", "Warning", message)
}

export const showSuccessNotification = (message: string) => {
	showNotification("success", "Success", message)
}

export const showInfoNotification = (message: string) => {
	showNotification("info", "Info", message)
}
