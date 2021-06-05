import sut from './merge.module.service'
import {CreateMergeModulesDto} from '../dto/create.merge.modules.dto';

describe("merge module service", () => {
    beforeEach((() => {

    }))
    it("insert and find resource ", async () => {
        const resource: CreateMergeModulesDto = {
            source: 'bla',
            destination: ['blabla']
        }
        const id = await sut.create(resource)
        expect(id).toBeDefined()
        const fromDb = await sut.read(id)
        expect(fromDb).toBeDefined()
        expect(fromDb?.source).toBe(resource.source)
        expect(fromDb?.id).toBe(id)
        expect(fromDb?.result).toContainAllValues(resource.destination)
    })
})