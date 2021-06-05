import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import MergeModuleController from './controllers/merge.modules.controller'
import MergeModulesMiddleware from './middleware/MergeModulesMiddleware';

const apiPath = '/api/modules/merge'

export class MergeModulesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'mergeModule');
    }

    configureRoutes() {

        this.app.route(`${apiPath}`)
            .get(MergeModuleController.list)
            .post(MergeModuleController.create)

        this.app.param(`id`, MergeModulesMiddleware.extractId);
        this.app.route(`${apiPath}/:id`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /modules/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(MergeModuleController.read)

        return this.app;
    }

}