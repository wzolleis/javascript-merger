import {Module, ModuleId} from '../module.types';
import ModulesRepo from '../infrastructure/modules.repo'
import {CreateModuleDto} from '../dto/create.module.dto';
import {PutModuleDto} from '../dto/put.module.dto';
import {Optional} from '../../common/common.types';

class ModulesService {
    async create(resource: CreateModuleDto): Promise<ModuleId> {
        const module: Module = {
            ...resource
        }
        return ModulesRepo.insert(module)
    }

    async remove(id: ModuleId): Promise<Optional<Module>> {
        return ModulesRepo.delete(id)
    }

    async list(): Promise<Array<Module>> {
        return ModulesRepo.listItems()
    }

    async update(id: ModuleId, resource: PutModuleDto): Promise<Optional<string>> {
        const data: Module = {
            ...resource
        }
        return ModulesRepo.update(data)
    }

    async read(id: ModuleId): Promise<Optional<Module>> {
        return ModulesRepo.findById(id)
    }
}

export default new ModulesService()