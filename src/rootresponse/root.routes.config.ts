import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import ModuleController from './controllers/modules.controller'

const modulePath = '/api/modules'

export class ModulesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'Root');
    }

    configureRoutes() {

        this.app.route(`${modulePath}`)
            .get(ModuleController.listModules)


        return this.app;
    }

}