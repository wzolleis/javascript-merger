import {InMemoryRepo} from './in.memory.repo';

interface TestData {
    value: string,
    id?: string
}

const sut = new InMemoryRepo<TestData>("test")
const items: TestData[] = [
    {value: "chuck norris"},
    {value: "bruce lee"},
    {value: "jackie chan"}
]

describe("in memory repo CRUD test", () => {
    beforeEach(() => {
        sut.clear()
    })

    const insertItems = async (): Promise<string[]> => {
        return await Promise.all(
            items.map(item => {
                return sut.insert(item)
            })
        )
    }

    it("insert items", async () => {
        const ids: string[] = await insertItems()
        expect(ids).toBeDefined()
        expect(ids).toHaveLength(items.length)
        expect(sut.size()).toBe(items.length)
    })

    it("find items", async () => {
        const ids: string[] = await insertItems()
        const itemsInRepo = await Promise.all(
            ids.map(id => {
                return sut.findById(id)
            })
        )
        itemsInRepo.map(it => {
            expect(it).toBeDefined()
            expect(items.findIndex((v => v.value === it?.value))).toBeGreaterThanOrEqual(0)
        })

    })
    it("delete item", async () => {
        const ids: string[] = await insertItems()
        const deletedItems = await Promise.all(ids.map(id => {
            return sut.delete(id)
        }))
        const notFoundItems = await Promise.all(
            deletedItems.map(deleted => {
                expect(deleted).toBeDefined()
                expect(deleted!.id).toBeDefined()
                return sut.findById(deleted!.id!)
            }))
        notFoundItems.map(notFound => {
            expect(notFound).toBeUndefined()
        })
    })
    it("update item", async () => {
        const ids: string[] = await insertItems()
        const item = await sut.findById(ids[0])
        const updatedId = await sut.update({
            id: item!.id!,
            value: "test value"
        })
        expect(updatedId).toBe(ids[0])
        const updatedItemFromDb = await sut.findById(updatedId!)
        expect(updatedItemFromDb?.value).toBe("test value")
    })
})