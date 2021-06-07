import {PackageJson} from '../../common/common.types';

class MergeService {
    merge(sourceJson: PackageJson, destinationsJson: PackageJson): object {
        const dependencies = {
            ...destinationsJson.dependencies,
            ...sourceJson.dependencies
        }
        const devDependencies = {
            ...destinationsJson.devDependencies,
            ...sourceJson.devDependencies
        }

        return {
            ...destinationsJson,
            ...sourceJson,
            dependencies,
            devDependencies
        }
    }
}

export default new MergeService()