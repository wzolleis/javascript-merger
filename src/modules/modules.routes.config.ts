import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class ModulesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PackageJsonRoutes');
    }

    configureRoutes() {

        this.app.route(`/modules`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of modules`);
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to modules`);
            });

        this.app.route(`/modules/:moduleId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /modules/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }

}