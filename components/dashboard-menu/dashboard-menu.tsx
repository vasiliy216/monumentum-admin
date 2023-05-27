import React from "react"
import {
	BulbOutlined,
	BorderOutlined,
	BlockOutlined,
	BankOutlined,
	GatewayOutlined,
	ExperimentOutlined,
	PictureOutlined
} from "@ant-design/icons"
import { Menu } from "antd"
import type { MenuProps } from "antd"
import { useRouter } from "next/router"
import styles from "./style.module.css"

const menuItems = [
	{
		key: "Singles",
		icon: <BorderOutlined />,
		label: "Singles"
	},
	{
		key: "Double",
		icon: <BlockOutlined />,
		label: "Double"
	},
	{
		key: "Exclusive",
		icon: <BankOutlined />,
		label: "Exclusive"
	},
	{
		key: "Fences",
		icon: <GatewayOutlined />,
		label: "Fences"
	},
	{
		key: "Vases",
		icon: <BulbOutlined />,
		label: "Vases"
	},
	{
		key: "Stone",
		icon: <ExperimentOutlined />,
		label: "Stone"
	},
	{
		key: "Gallery",
		icon: <PictureOutlined />,
		label: "Gallery",
		disabled: true
	}
]

export const DashboardMenu = () => {
	const router = useRouter()
	const { page } = router.query
	const handleMenuChange: MenuProps["onClick"] = (e) => { router.push({ pathname: "/admin/dashboard", query: { page: e.key } }) }
	const defaultItem = page as string || "Singles"
	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[defaultItem]}
			className={styles.menu}
			onClick={handleMenuChange}
			items={menuItems}
		/>
	)
}
