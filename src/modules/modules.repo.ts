import shortid from 'shortid';
import debug from 'debug';
import {CreateModuleDto} from './create.module.dto';
import {PutModuleDto} from './put.module.dto';
import {Module, ModuleId, Optional} from './module.types';

const log: debug.IDebugger = debug('app:in-memory-repo');

class ModulesRepo {
    modules: Array<Module> = [];

    constructor() {
        log('Created new instance of ModulesRepo');
    }

    async addModule(createModule: CreateModuleDto): Promise<ModuleId> {
        const module: Module = {
            id: shortid.generate(),
            ...createModule
        }
        this.modules.push(module)
        return module.id;
    }

    async getModules() {
        return [...this.modules];
    }

    async getModuleById(moduleId: ModuleId): Promise<Optional<Module>> {
        const findById = (module: Module) => module.id === moduleId
        return this.modules.find(findById);
    }

    async putModuleById(moduleId: ModuleId, module: PutModuleDto): Promise<ModuleId> {
        const findById = (module: Module) => module.id === moduleId
        const objIndex = this.modules.findIndex(findById)

        this.modules.splice(objIndex, 1, module);
        log(`${module.id} updated via put`);
        return module.id
    }

    async delete(moduleId: ModuleId): Promise<Optional<Module>> {
        const findById = (module: Module) => module.id === moduleId
        const removedItem = this.modules.find(findById)
        if (removedItem) {
            const objIndex = this.modules.findIndex(findById)
            this.modules = this.modules.splice(objIndex, 1)
        }

        return removedItem
    }
}

export default new ModulesRepo()