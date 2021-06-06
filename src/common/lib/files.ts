import path from 'path'
import fs from 'fs'

export const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

export const pathExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

