import {PackageJson} from "../common/common.types";

export interface MergeData {
    source: {
        path: string
        content: PackageJson
    }
    destination: {
        path: string
        content: PackageJson
    }
    result?: {
        path: string
        content: PackageJson
    }
}

