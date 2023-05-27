import {
	doubleMonuments,
	exclusiveMonuments,
	fences,
	simpleMonument,
	vases
} from "./index"

export type ItemsType = typeof doubleMonuments.body | typeof exclusiveMonuments.body | typeof fences.body | typeof simpleMonument.body | typeof vases.body

export type TransformInOptionalType<T> = { [P in keyof T]?: T[P] }
export type TransformType<A extends readonly unknown[]> = A extends readonly (infer ElementType)[] ? ElementType : never

export type ItemType = TransformInOptionalType<TransformType<ItemsType>>