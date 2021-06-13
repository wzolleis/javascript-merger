import path from 'path'
import fs from 'fs'

export const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

export const pathExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

export const readFile = (filePath: string) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents)
}

export const writeObjectToFile = (filePath: string, data: object) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}