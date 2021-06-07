export type Optional<T> = T | undefined | null

export interface Identifyable {
    id?: string
}

export interface CliOptions {
    source: string,
    destination: string[]
}

export interface PackageJson {
    name: string
    version: string
    description: string
    dependencies: {
        [key: string]: [value: string]
    },
    devDependencies: {
        [key: string]: [value: string]
    }
}