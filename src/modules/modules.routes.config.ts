import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import ModuleController from './controllers/modules.controller'
import ModulesMiddleware from './middleware/ModulesMiddleware';

const modulePath = '/api/modules'

export class ModulesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PackageJsonRoutes');
    }

    configureRoutes() {

        this.app.route(`${modulePath}`)
            .get(ModuleController.listModules)
            .post(ModulesMiddleware.validateRequiredModuleBodyFields, ModuleController.createModule)
        this.app.param(`id`, ModulesMiddleware.extractId);

        this.app.route(`${modulePath}/:id`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /modules/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(ModuleController.getModuleById)
            .delete(ModuleController.removeModule)

        this.app.put(`${modulePath}/:id`, [
            ModulesMiddleware.validateRequiredModuleBodyFields,
            ModuleController.putModule])


        return this.app;
    }

}