import debug from 'debug';
import shortid from 'shortid';
import {Identifyable, Optional} from '../../common.types';

const log: debug.IDebugger = debug('app:items-repo');

export class InMemoryRepo<T extends Identifyable> {
    items: Array<T> = []

    constructor(msg: string) {
        log(msg)
    }

    async insert(resource: T): Promise<string> {
        const item: T = {
            ...resource,
            id: shortid.generate(),
        }
        this.items.push(item)
        return item.id!
    }

    async listItems(): Promise<Array<T>> {
        return [...this.items]
    }

    async findById(id: string): Promise<Optional<T>> {
        const findById = (item: T) => item.id === id
        return this.items.find(findById)
    }

    async update(resource: T): Promise<Optional<string>> {
        const findById = (item: T) => item.id === resource.id
        const objIndex = this.items.findIndex(findById)

        if (objIndex >= 0) {
            this.items[objIndex] = resource
            return resource.id
        }
        return undefined
    }

    async delete(itemId: string): Promise<Optional<T>> {
        const findById = (item: T) => item.id === itemId
        const toBeRemoved = this.items.find(findById)
        if (toBeRemoved) {
            this.items = this.items.filter((item) => item.id !== itemId)
        }
        return toBeRemoved
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

}