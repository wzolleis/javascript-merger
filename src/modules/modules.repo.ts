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
        this.modules = [
            ...this.modules,
            module,
        ]
        return module.id;
    }

    async getModules() {
        return [...this.modules];
    }

    async getModuleById(moduleId: ModuleId): Promise<Optional<Module>> {
        return this.modules.find((module: { id: ModuleId }) => module.id === moduleId);
    }

    async putModuleById(moduleid: ModuleId, module: PutModuleDto): Promise<ModuleId> {
        const objIndex = this.modules.findIndex(
            (obj: { id: string }) => obj.id === moduleid
        );
        this.modules.splice(objIndex, 1, module);
        log(`${module.id} updated via put`);
        return module.id
    }
}

export default new ModulesRepo()