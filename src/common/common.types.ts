export interface CliOptions {
    source: string,
    destination: string[]
    workingDirectory: string
}

export interface CommandLineConfigFile {
    source: string,
    destination: string[],
    cwd: string
}

export interface PackageJson {
    dependencies: Record<string, string>,
    devDependencies: Record<string, string>
}