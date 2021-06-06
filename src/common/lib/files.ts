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

    try {
        const data = JSON.parse(fileContents)
        console.log(data);
    } catch(err) {
        console.error(err);
    }
}