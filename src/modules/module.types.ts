import {Identifyable} from '../common/common.types';

export interface Module extends Identifyable {
    name: string,
    path: string,
    type: string,
    content: object
}

export type ModuleId = string