export type Optional<T> = T | undefined | null

export interface Identifyable {
    id?: string
}

export interface CliOptions {
    source: string,
    destination: string[]
}