import {PackageJson} from '../../common/common.types';
import sut from './merge.service'
import {MergeData} from "../merge.modules.types";

describe("merge dependencies", () => {
    let source: PackageJson = {dependencies: {}, devDependencies: {}}
    let destination: PackageJson = {dependencies: {}, devDependencies: {}}
    let mergeData: MergeData = {
        source: {
            path: '',
            content: source
        },
        destination: {
            path: '',
            content: destination
        }
    }

    beforeEach(() => {
        const sourceDependencies = {
            dependencies: {
                ["test"]: "1.0.0", // wird aktualisiert
                ["test-2"]: "3.0.0" // fehlt, wird eingefuegt
            },
            devDependencies: {
                ["test"]: "1.0.0", // wird aktualisiert
                ["test-2"]: "3.0.0" // fehlt, wird eingefuegt
            }
        }

        source = {
            dependencies: {
                ...sourceDependencies.dependencies
            },
            devDependencies: {
                ...sourceDependencies.devDependencies
            }
        }

        const destinationDependencies = {
            dependencies: {
                ["test"]: "0.1.0.", // wird aktualisiert
                //["test-2"]: "x.y.z" // fehlt, wird eingefuegt
                ["test-3"]: "1.2.0" // bleibt erhalten
            },
            devDependencies: {
                ["test"]: "0.1.0.", // wird aktualisiert
                //["test-2"]: "x.y.z" // fehlt, wird eingefuegt
                ["test-3"]: "1.2.0" // bleibt erhalten
            }
        }

        destination = {
            dependencies: {
                ...destinationDependencies.dependencies
            },
            devDependencies: {
                ...destinationDependencies.devDependencies
            }
        }

        mergeData = {
            source: {
                path: '',
                content: source
            },
            destination: {
                path: '',
                content: destination
            }
        }
    })

    it("merge dependencies", () => {
        const result = sut.mergeData(mergeData)

        expect(result.result).toBeDefined()
        expect(result.result?.content.dependencies).toBeDefined()
        expect(result.result?.content.devDependencies).toBeDefined()

        expect(result.result?.content.dependencies!["test"]).toBe(source.dependencies!["test"]) // update
        expect(result.result?.content.dependencies!["test-2"]).toBe(source.dependencies!["test-2"]) // neu
        expect(result.result?.content.dependencies!["test-3"]).toBe(destination.dependencies!["test-3"]) // bleibt erhalten

        expect(result.result?.content.devDependencies!["test"]).toBe(source.devDependencies!["test"]) // update
        expect(result.result?.content.devDependencies!["test-2"]).toBe(source.devDependencies!["test-2"]) // neu
        expect(result.result?.content.devDependencies!["test-3"]).toBe(destination.devDependencies!["test-3"]) // bleibt erhalten
    })
})