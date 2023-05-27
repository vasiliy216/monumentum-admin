import React, { useState, useEffect } from "react"
import { Layout } from "antd"
import type { RadioChangeEvent } from "antd"
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from "@ant-design/icons"
import { useRouter } from "next/router"
import { getItems } from "fetch-api"
import { ItemsType } from "components/shared/data/types"
import { ContentInner, DashboardMenu, Profile } from "components"
import { CurrentModalType } from "pages/api/item-monument"
import styles from "./style.module.css"

const { Header, Content, Sider } = Layout

type CollapsedItemType = {
	collapsed: boolean
	handleCollapsedChange: () => void
}

const CollapsedItem = ({ collapsed, handleCollapsedChange }: CollapsedItemType) => React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
	className: styles.dash_trigger,
	onClick: handleCollapsedChange
})

export default function Dashboard() {
	const router = useRouter()
	const { page } = router.query

	const [collapsed, setCollapsed] = useState(false)
	const [loading, setLoading] = useState(false)
	const [items, setItems] = useState<ItemsType>([])
	const [size, setSize] = useState(4)

	const handleSizeChange = (e: RadioChangeEvent) => { setSize(e.target.value) }
	const handleCollapsedChange = () => { setCollapsed(prevState => !prevState) }

	useEffect(() => {
		const handle = async () => {
			setLoading(true)
			const items = await getItems("all", page as CurrentModalType)
			setItems(items)
			setLoading(false)
		}
		handle()
	}, [page])

	return (
		<Layout style={{ overflow: "hidden" }}>
			<Sider width={200} trigger={null} collapsible collapsed={collapsed}>
				<div className={styles.dash_logo}>MonumentuM</div>
				<DashboardMenu />
			</Sider>
			<Layout>
				<Header className={styles.dash_header}>
					<CollapsedItem handleCollapsedChange={handleCollapsedChange} collapsed={collapsed} />
					<Profile />
				</Header>
				<Layout style={{ padding: "24px" }}>
					<Content className={styles.dash_content}>
						<ContentInner
							handleSizeChange={handleSizeChange}
							items={items}
							loading={loading}
							size={size}
							page={page}
						/>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	)
}

export const config = {
	api: {
		bodyParser: false,
		responseLimit: "4mb"
	}
}