export type ItemForMonumentType = {
    id: string
    name: string
    img: string
    cost: string
    size: {
        length: string
        width: string
        height: string
    }
    info: string[] | null
    type: string
}

export type ItemForStoneType = {
    id: string
    name: string
    img: string
    type: string
}

export type TypesOfValueMonument = {
    title: string
    body: ItemForMonumentType[]
}

export type TypesOfValueStone = {
    title: string
    body: ItemForStoneType[]
}

export type ButtonSquareType = {
    onClick?: () => void,
    children?: string | JSX.Element
    small?: boolean
}

export type User = {
    email: string
    userName:string
    password?: string
}

export type TransformationType<T> = { [P in keyof T]?: T[P] }