import {MergeData} from "../merge.modules.types";
import {readFile, writeObjectToFile} from "../../common/lib/files";

class MergeService {
    createMergeData(source: string, destination: string): MergeData {
        return {
            source: {
                path: source,
                content: readFile(source)
            },
            destination: {
                path: destination,
                content: readFile(destination)
            }
        }
    }

    mergeAll(mergeData: MergeData[]): MergeData[] {
        return mergeData
            .flatMap(this.mergeData)
            .flatMap(this.writeData)
    }

    mergeData(input: MergeData): MergeData {
        const dependencies = {
            ...input.destination.content.dependencies,
            ...input.source.content.dependencies
        }
        const devDependencies = {
            ...input.destination.content.devDependencies,
            ...input.source.content.devDependencies
        }

        const mergeResult = {
            ...input.destination.content,
            dependencies,
            devDependencies
        }

        return {
            ...input,
            result: {
                path: input.destination.path,
                content: mergeResult
            }
        }
    }

    writeData(input: MergeData): MergeData {
        writeObjectToFile(input.result?.path!, input.result?.content!)
        return input
    }
}

export default new MergeService()