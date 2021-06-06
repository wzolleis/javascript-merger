import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import RootController from './controllers/root.controller'

const modulePath = '/'

export class RootRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'Root');
    }

    configureRoutes() {

        this.app.route(`${modulePath}`)
            .get(RootController.welcomeMessage)
        return this.app;
    }
}
