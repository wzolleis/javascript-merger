import {Module, ModuleId, Optional} from '../module.types';
import ModulesRepo from '../modules.repo'
import {CreateModuleDto} from '../create.module.dto';
import {PutModuleDto} from '../put.module.dto';

class ModulesService {
    async create(resource: CreateModuleDto): Promise<ModuleId> {
        return ModulesRepo.addModule(resource)
    }

    async deleteById(id: ModuleId): Promise<Optional<Module>> {
        return ModulesRepo.delete(id)
    }

    async list(): Promise<Array<Module>> {
        return ModulesRepo.getModules()
    }

    async putById(id: ModuleId, resource: PutModuleDto): Promise<string> {
        return ModulesRepo.putModuleById(id, resource)
    }

    async readById(id: ModuleId): Promise<Optional<Module>> {
        return ModulesRepo.getModuleById(id)
    }
}

export default new ModulesService()