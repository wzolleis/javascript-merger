export type Optional<T> = T | undefined | null

export interface Identifyable {
    id?: string
}

export interface CliOptions {
    source: string,
    destination: string[]
}

export interface MergeAttributes {
    dependencies: {
        [key: string]: [value: string]
    },
    devDependencies: {
        [key: string]: [value: string]
    }
}