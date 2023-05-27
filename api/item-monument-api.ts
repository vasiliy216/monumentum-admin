import { NextApiRequest } from "next"
import Router from "next/router"
import { fetchApi } from "./fetch-api"
import { ItemType } from "components/admin/shared/data/types"
import { CurrentModalType } from "pages/api/item-monument"

export const getItems = async (page: string | "all", tp: CurrentModalType = "Singles", req?: NextApiRequest) => {
	try {
		const res = await fetchApi(req, `/api/item-monument?page=${page}&tp=${tp}`)
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const createItem = async (formData: FormData, req?: NextApiRequest) => {
	try {
		const { page: tp = "Singles" } = Router.query
		const res = await fetchApi(req, `/api/item-monument?tp=${tp}`, {
			method: "POST",
			headers: {},
			body: formData
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const updateItem = async (formData: FormData, req?: NextApiRequest) => {
	try {
		const { page: tp = "Singles" } = Router.query
		const res = await fetchApi(req, `/api/item-monument?tp=${tp}`, {
			method: "PUT",
			headers: {},
			body: formData
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}

export const deleteItem = async (id: string, req?: NextApiRequest) => {
	try {
		const { page: tp = "Singles" } = Router.query
		const res = await fetchApi(req, `/api/item-monument?id=${id}&tp=${tp}`, {
			method: "DELETE",
			headers: {}
		})
		const json = await res.json()
		return json
	} catch (error) {
		console.log(error)
		return { status: false, message: "Something was wrong" }
	}
}