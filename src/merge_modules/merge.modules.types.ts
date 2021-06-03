import {ModuleId} from '../modules/module.types';
import {Identifyable} from '../common/common.types';

export interface MergeResult extends Identifyable {
    source: ModuleId,
    result: ModuleId[]
}

