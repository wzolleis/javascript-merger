export type Optional<T> = T | undefined | null

export interface CliOptions {
    source: string,
    destination: string[]
    workingDirectory: string
}

export interface PackageJson {
    dependencies: Record<string, string>,
    devDependencies: Record<string, string>
}