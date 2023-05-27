/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
	Form, Input, Upload, message, Button
} from "antd"
import ImgCrop from "antd-img-crop"
import type { UploadChangeParam } from "antd/es/upload"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons"
import { createItem, updateItem } from "fetch-api"
import { showSuccessNotification, showErrorNotification } from "components/shared"
import { ItemType } from "components/shared/data/types"
import { ModalOpenType } from "./modal-controller"
import styles from "./style.module.css"

type ModalControllerPropsType = {
	type: ModalOpenType
	data: ItemType | null
	handleCancel: () => void
}

const { TextArea } = Input

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader()
	reader.addEventListener("load", () => callback(reader.result as string))
	reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!")
	}
	const isLt500K = file.size / 1024 / 1024 < 0.5
	if (!isLt500K) {
		message.error("Image must smaller than 500Kb!")
	}
	return isJpgOrPng && isLt500K
}

const UploadButton = ({ loading }: { loading: boolean }) => (
	<div>
		{loading ? <LoadingOutlined /> : <PlusOutlined />}
		<div style={{ marginTop: 8 }}>Upload</div>
	</div>
)

type GetFormDataType = {
	file: RcFile | null
	fields: Record<string, string | number | null>
}

const getFormData = ({ fields, file }: GetFormDataType) => {
	const formData = new FormData()
	Object.entries(fields).forEach(([field, value]) => {
		formData.append(field, value as string || "")
	})
	if (file) { formData.append("file", file) }
	return formData
}

export const ContentModal = (props: ModalControllerPropsType) => {
	const {
		data, type,
		handleCancel
	} = props

	const [loading, setLoading] = useState(false)
	const [loadingBtn, setLoadingBtn] = useState(false)
	const [file, setFile] = useState<null | RcFile>(null)
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	const [form] = Form.useForm()

	const resetForm = useCallback(() => {
		setImageUrl(null)
		setFile(null)
		form.resetFields()
	}, [form])

	useEffect(() => {
		if (type === "edit" && data) {
			const newData = JSON.parse(JSON.stringify(data))
			const size = newData.size
			delete newData.size
			form.setFieldsValue({ ...form.getFieldsValue(), ...newData, ...size })
			setImageUrl(newData.img)
			return
		}
		resetForm()
	}, [type, data, handleCancel, resetForm, form])

	const handleChange: UploadProps["onChange"] = async (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true)
			return
		}
		if (info.file.status === "done") {
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false)
				setImageUrl(url)
			})
		}
	}

	const submitAdd = async (props: Record<string, never>) => {
		console.log("props", props)
		const formData = getFormData({ fields: props, file })
		const res = await createItem(formData)

		if (res.statusCode === 200) { showSuccessNotification("The new item was successfully added.") }
		else { showErrorNotification(res.error) }
	}

	const submitEdit = async (props: Record<string, never>) => {
		const fields: any = { ...props, id: data?.id as string }
		if (data?.img !== imageUrl) { fields.prevImg = data?.img as string }

		const formData = getFormData({ fields, file })
		const res = await updateItem(formData)

		if (res.statusCode === 200) { showSuccessNotification("The item was successfully updated.") }
		else { showErrorNotification(res.error) }
	}

	const submit = async (props: Record<string, never>) => {
		setLoadingBtn(true)

		if (type === "add") { await submitAdd(props) }
		if (type === "edit") { await submitEdit(props) }

		setLoadingBtn(false)
		resetForm()
		handleCancel()
	}

	return (
		<Form
			form={form}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			onFinish={submit}
			layout="horizontal"
			style={{ maxWidth: 600 }}
		>
			<Form.Item
				label="Image"
				required
				rules={[{
					required: true,
					message: "Image cannot be empty"
				}]}
			>
				<ImgCrop>
					<Upload
						listType="picture-card"
						className={styles.upload}
						showUploadList={false}
						beforeUpload={async (file) => {
							console.log("async (file)", file)
							setFile(file)
							return beforeUpload(file)
						}}
						onChange={handleChange}
					>
						{imageUrl
							? (
								<Image
									src={/https|;base64,/.test(imageUrl) ? imageUrl : `/${imageUrl}`}
									alt={data?.name as string || "image"}
									width={100}
									height={100}
									style={{ width: "100%", height: "auto", borderRadius: "8px" }}
								/>
							)
							: <UploadButton loading={loading} />}
					</Upload>
				</ImgCrop>
			</Form.Item>
			<Form.Item
				name="name"
				label="Name"
				required
				rules={[{
					required: true,
					message: "Name cannot be empty"
				}]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="cost" label="Cost">
				<Input type="number" />
			</Form.Item>
			<Form.Item name="length" label="Length">
				<Input type="number" />
			</Form.Item>
			<Form.Item name="width" label="Width">
				<Input type="number" />
			</Form.Item>
			<Form.Item name="height" label="Height">
				<Input type="height" />
			</Form.Item>
			<Form.Item name="info" label="Description">
				<TextArea rows={4} />
			</Form.Item>
			<div className={styles.btn}>
				<Button htmlType="submit" type="primary" loading={loadingBtn}>
					{type}
				</Button>
				<Button key="cancel" onClick={handleCancel}>
					Cancel
				</Button>
			</div>
		</Form >
	)
}
