import {MergeData} from "../merge.modules.types";
import {readFile, writeObjectToFile} from "../../common/lib/files";

class MergeService {
    mergeAll(source: string, destinations: string[]): MergeData[] {
        return destinations
            .flatMap(destination => this.readData(source, destination))
            .flatMap(this.mergeData)
            .flatMap(this.writeData)
    }

    readData(source: string, destination: string): MergeData {
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

    mergeData(input: MergeData): MergeData {
        const dependencies = {
            ...input.destination.content.dependencies,
            ...input.source.content.dependencies
        }
        const devDependencies = {
            ...input.destination.content.devDependencies,
            ...input.source.content.devDependencies
        }

        return {
            ...input,
            result: {
                path: input.destination.path,
                content: {
                    ...input.destination.content,
                    dependencies,
                    devDependencies
                }
            }
        }
    }

    writeData(input: MergeData): MergeData {
        writeObjectToFile(input.result?.path!, input.result?.content!)
        return input
    }
}

export default new MergeService()