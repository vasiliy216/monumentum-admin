import React from "react"
import { Modal } from "antd"
import { ItemType } from "components/shared/data/types"
import { ContentModal } from "./content-modal"

export type ModalOpenType = "edit" | "add" | ""

type ModalControllerType = {
	page: string | string[] | undefined
	modalOpen: ModalOpenType
	handleCancel: () => void
	data: ItemType | null
}

export const ModalController = (props: ModalControllerType) => {
	const {
		page, modalOpen,
		handleCancel, data
	} = props

	const titleController = () => {
		if (modalOpen === "add") { return `Add an item to ${page}` }
		if (modalOpen === "edit") { return "Edit item" }
	}

	return (
		<Modal
			title={titleController()}
			open={!!modalOpen}
			onCancel={handleCancel}
			width={600}
			footer={[]}
		>
			<ContentModal
				data={data}
				type={modalOpen}
				handleCancel={handleCancel}
			/>
		</Modal>
	)
}
