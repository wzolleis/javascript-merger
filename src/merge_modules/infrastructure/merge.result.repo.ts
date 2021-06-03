import {InMemoryRepo} from '../../common/items/infrastructure/in.memory.repo';
import {MergeResult} from '../merge.modules.types';

const mergeModuleRepo = new InMemoryRepo<MergeResult>("item type: MergeResult")
export default mergeModuleRepo