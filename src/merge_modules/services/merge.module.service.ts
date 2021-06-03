import mergeResultRepo from '../infrastructure/merge.result.repo'
import {Optional} from '../../common/common.types';
import {CreateMergeModulesDto} from '../dto/create.merge.modules.dto';
import {MergeResult} from '../merge.modules.types';

class MergeModuleService {
    async create(resource: CreateMergeModulesDto): Promise<string> {
        const mergeResult: MergeResult = {
            source: resource.source,
            result: []
        }
        return mergeResultRepo.addItem(mergeResult)
    }

    async remove(id: string): Promise<Optional<MergeResult>> {
        return mergeResultRepo.delete(id)
    }

    async list(): Promise<Array<MergeResult>> {
        return mergeResultRepo.listItems()
    }

    async read(id: string): Promise<Optional<MergeResult>> {
        return mergeResultRepo.getItemById(id)
    }
}

export default new MergeModuleService()