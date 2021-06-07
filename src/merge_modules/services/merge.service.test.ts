import {PackageJson} from '../../common/common.types';
import sut from './merge.service'

describe("merge dependencies", () => {
    let source: PackageJson = {dependencies: {}, devDependencies: {}}
    let destination: PackageJson = {dependencies: {}, devDependencies: {}}

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

    })

    it("merge dependencies", () => {
        const result = sut.merge(source, destination)
        expect(result.dependencies).toBeDefined()
        expect(result.devDependencies).toBeDefined()

        expect(result.dependencies!["test"]).toBe(source.dependencies!["test"]) // update
        expect(result.dependencies!["test-2"]).toBe(source.dependencies!["test-2"]) // neu
        expect(result.dependencies!["test-3"]).toBe(destination.dependencies!["test-3"]) // bleibt erhalten

        expect(result.devDependencies!["test"]).toBe(source.devDependencies!["test"]) // update
        expect(result.devDependencies!["test-2"]).toBe(source.devDependencies!["test-2"]) // neu
        expect(result.devDependencies!["test-3"]).toBe(destination.devDependencies!["test-3"]) // bleibt erhalten
    })
})