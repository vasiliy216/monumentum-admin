import React from "react"
import { Radio } from "antd"
import type { RadioChangeEvent } from "antd"

type SettingsForPageType = {
	size: number
	handleSizeChange: (e: RadioChangeEvent) => void
}

export const SettingsForPage = (props: SettingsForPageType) => {
	const { size, handleSizeChange } = props

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<span style={{ marginRight: "10px" }}>Size Rows:</span>
			<Radio.Group value={size} onChange={handleSizeChange}>
				<Radio.Button value={6}>Large</Radio.Button>
				<Radio.Button value={4}>Default</Radio.Button>
				<Radio.Button value={2}>Small</Radio.Button>
			</Radio.Group>
		</div>
	)
}
