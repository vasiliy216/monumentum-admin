import React, { useState } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { showWarningNotification } from "components"
import { TransformationType } from "types"
import styles from "./style.module.css"

export default function Login() {
	const router = useRouter()

	const [fields, setFields] = useState({
		userName: "",
		password: ""
	})

	const [loading, setLoading] = useState(false)

	const [form] = Form.useForm()

	const handleChange = (field: TransformationType<typeof fields>) => {
		setFields(prevState => ({ ...prevState, ...field }))
	}

	const handleSubmit = async () => {
		setLoading(true)
		const data = { ...fields, password: window.btoa(fields.password) }
		const res = await signIn("login", { ...data, redirect: false })
		setLoading(false)

		if (res?.error) { return showWarningNotification(res?.error) }
		router.push("/")
	}

	return (
		<div className="container">
			<div className={styles.inner}>
				<div className={styles.box}>
					<div className={styles.title}>
						<h2>Monumentum Admin</h2>
						<p>Please enter your user information.</p>
					</div>
					<Form
						form={form}
						onValuesChange={handleChange}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="userName"
							rules={[{
								required: true,
								message: "User name cannot be empty"
							}]}
							initialValue={fields.userName}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="userName"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{
								required: true,
								message: "Password cannot be empty"
							}]}
							initialValue={fields.password}
						>
							<Input
								prefix={<LockOutlined />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item
							style={{ margin: 0 }}
						>
							<Button
								className={styles.btn}
								type="primary"
								htmlType="submit"
								loading={loading}
							>
								Sign In
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}