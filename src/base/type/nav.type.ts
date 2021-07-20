export interface metaType {
    hidden?: boolean
}

export interface navItemType {
    path: string,
    component?: Function
    name?: string
    ssoCode?: string
    meta?: metaType
    children?: navItemType[]
}

