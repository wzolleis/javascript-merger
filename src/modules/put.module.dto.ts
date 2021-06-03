import {Module} from './module.types';

export interface PutModuleDto {
    id: string
    name: string,
    path: string,
    type: string
    content: Module
}