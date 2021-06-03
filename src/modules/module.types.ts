export interface Module {
    id: string
    name: string,
    path: string,
    type: string,
    content: object
}

export type ModuleId = string

export type Optional<T> = T | undefined