import {Module, ModuleId, Optional} from '../module.types';
import ModulesRepo from '../modules.repo'
import {CreateModuleDto} from '../create.module.dto';

class ModulesService {
    async create(resource: CreateModuleDto): Promise<ModuleId> {
        return ModulesRepo.addModule(resource)
    }

    async deleteById(id: string): Promise<ModuleId> {
        return Promise.resolve('');
    }

    async list(): Promise<Optional<Module>> {
        return Promise.resolve(undefined);
    }

    async putById(id: ModuleId, resource: Optional<Module>): Promise<string> {
        return Promise.resolve('');
    }

    async readById(id: ModuleId): Promise<Optional<Module>> {
        return Promise.resolve(undefined);
    }
}

export default new ModulesService()