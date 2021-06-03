import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:modules-middleware');

class MergeModulesMiddleware {
    async extractId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.id;
        next();
    }
}

export default new MergeModulesMiddleware();