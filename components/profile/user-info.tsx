import { Drawer } from "antd"
import { useAppSelector } from "hooks/redux"
import React from "react"

type Props = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserInfo = (props: Props) => {
	const { open, setOpen } = props
	const { email, userName } = useAppSelector(s => s.userInfo)

	return (
		<Drawer
			title="Profile"
			placement="right"
			onClose={() => setOpen(false)}
			open={open}
		>
			<div>email: {email}</div>
			<div>User Name: {userName}</div>
		</Drawer>
	)
}