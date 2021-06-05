import mergeResultRepo from '../infrastructure/merge.result.repo'
import {Optional} from '../../common/common.types';
import {CreateMergeModulesDto} from '../dto/create.merge.modules.dto';
import {MergeResult} from '../merge.modules.types';
import debug from 'debug';

const log: debug.IDebugger = debug('app:merge module service');

class MergeModuleService {
    async create(resource: CreateMergeModulesDto): Promise<string> {
        const mergeResult: MergeResult = {
            source: resource.source,
            result: resource.destination // todo - hier muss das Ergebnis des Merge rein (ids im Module-Repo)
        }
        return mergeResultRepo.insert(mergeResult)
    }

    async remove(id: string): Promise<Optional<MergeResult>> {
        return mergeResultRepo.delete(id)
    }

    async list(): Promise<Array<MergeResult>> {
        return mergeResultRepo.listItems()
    }

    async read(id: string): Promise<Optional<MergeResult>> {
        return mergeResultRepo.findById(id)
    }
}

export default new MergeModuleService()