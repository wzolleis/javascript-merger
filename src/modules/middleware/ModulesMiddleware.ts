import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:modules-middleware');

class ModulesMiddleware {
    async validateRequiredModuleBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body && req.body.name && req.body.type && req.body.path && req.body.content) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields`,
            });
        }
    }

    async extractModuleId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.moduleId;
        next();
    }
}

export default new ModulesMiddleware();