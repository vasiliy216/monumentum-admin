import { signOut } from "next-auth/react"
import { PoweroffOutlined } from "@ant-design/icons"
// import { useAppSelector } from "hooks/redux"
// import { UserInfo } from "./user-info"
import styles from "./style.module.css"

export const Profile = () => {
	const logOut = () => { signOut({ callbackUrl: "/login" }) }

	return (
		<div className={styles.logout} onClick={logOut}><span className={styles.span}>Logout</span><PoweroffOutlined size={32} /></div>
	)
}
