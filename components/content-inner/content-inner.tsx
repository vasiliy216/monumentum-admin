import React, { useState } from "react"
import {
	EditOutlined,
	DeleteOutlined,
	AppstoreAddOutlined
} from "@ant-design/icons"
import { Card, Col, Row, Popconfirm } from "antd"
import type { RadioChangeEvent } from "antd"
import Image from "next/image"
import { deleteItem } from "fetch-api"
import { ModalController, ModalOpenType, SettingsForPage } from "components"
import { showSuccessNotification, showErrorNotification } from "components/shared"
import { ItemsType, ItemType } from "components/shared/data/types"
import styles from "./style.module.css"

const { Meta } = Card

type SizeType = {
	length: string
	width: string
	height: string
}

/* remake */

const config = {
	length: "Длина: ",
	width: "Ширина: ",
	height: "Высота: ",
	other: "Размер: ",
	x: " x ",
	sm: " см."
}

const configSize = {
	"0": function () { return undefined },
	"1": function () {
		const [key, value] = Object.entries(this)[0]
		return config[key as keyof typeof config] + value + config.sm
	},
	"2": function () {
		const values = Object.values(this).join(config.x)
		return config.other + values + config.sm
	},
	"3": function () {
		const values = Object.values(this).join(config.x)
		return config.other + values + config.sm
	}
}

const getSize = (size: SizeType) => {
	const objSize: Record<string, string> = {}
	Object.entries(size).forEach(([key, value]) => value && (objSize[key] = value))
	return configSize[String(Object.keys(objSize).length) as keyof typeof configSize].call(objSize)
}

/*  */

type ContentInnerType = {
	size: number
	handleSizeChange: (e: RadioChangeEvent) => void
	loading: boolean
	items: ItemsType
	page: string | string[] | undefined
}

export const ContentInner = (props: ContentInnerType) => {
	const {
		size, handleSizeChange,
		loading, items, page
	} = props

	const [modalOpen, setModalOpen] = useState<ModalOpenType>("")
	const [data, setData] = useState<ItemType | null>(null)

	const showModal = (str: ModalOpenType) => { setModalOpen(str) }

	const handleCancel = () => {
		setData(null)
		setModalOpen("")
	}

	const handleEdit = (item: ItemType) => {
		setData(item)
		showModal("edit")
	}

	const removeItem = async (id: string) => {
		const res = await deleteItem(id)

		if (res.statusCode === 200) { showSuccessNotification("The item was successfully deleted.") }
		else { showErrorNotification(res.error) }

		return null
	}

	return (
		<>
			<SettingsForPage
				handleSizeChange={handleSizeChange}
				size={size}
			/>
			<br />
			<Row gutter={[16, 16]}>
				{loading
					? new Array(17).fill("").map((_, i) => (
						<Col key={i} span={size}>
							<Card size="small" loading />
						</Col>
					))
					: items.map((item, index) => (
						<Col key={index} span={size}>
							<Card
								size="small"
								hoverable
								extra={<div>Cost: {item.cost} $</div>}
								cover={
									<div style={{ border: "1px solid #f0f0f0" }}>
										<Image
											src={item.img.includes("https") ? item.img : `/${item.img}`}
											alt={item.name}
											width={200}
											height={200}
											style={{ width: "100%", height: "auto" }}
										/>
									</div>
								}
								style={{ cursor: "default" }}
								actions={[
									<EditOutlined onClick={() => handleEdit(item)} key="edit" />,
									<Popconfirm
										key="delete"
										title="Delete the item"
										description="Are you sure to delete this item?"
										okText="Yes"
										cancelText="No"
										onConfirm={() => removeItem(item.id)}
									>
										<DeleteOutlined className={styles.icon_delete} />
									</Popconfirm>
								]}
							>
								<Meta
									title={item.name}
									description={getSize(item.size)}
								/>
							</Card>
						</Col>
					))}
				{!loading && (
					<Col span={size}>
						<Card
							size="small"
							className={styles.add_card}
							onClick={() => showModal("add")}
							hoverable
						>
							<div className={styles.add_body}>
								<AppstoreAddOutlined style={{ fontSize: 42, color: "inherit", marginBottom: 10 }} />
								<div>Add Item</div>
							</div>
						</Card>
					</Col>
				)}
				<ModalController
					page={page}
					modalOpen={modalOpen}
					handleCancel={handleCancel}
					data={data}
				/>
			</Row>
		</>
	)
}
