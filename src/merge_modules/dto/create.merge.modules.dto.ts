export interface CreateMergeModulesDto {
    source: string, // die id des Modules, von dem aus gemergt wird
    destination: string[] // die Ids der Module, in die gemergt wird
}