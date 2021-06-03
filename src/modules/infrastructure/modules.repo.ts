import {Module} from '../module.types';
import {InMemoryRepo} from '../../common/items/infrastructure/in.memory.repo';

const moduleRepo: InMemoryRepo<Module> = new InMemoryRepo<Module>("item type: Module")
export default moduleRepo