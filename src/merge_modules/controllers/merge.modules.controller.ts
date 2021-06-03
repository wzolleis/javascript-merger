import express from 'express';

import mergeService from '../services/merge.module.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';

const log: debug.IDebugger = debug('app:modules-controller');

class MergeModulesController {
    constructor() {
        log("merge modules controller")
    }

    async list(req: express.Request, res: express.Response) {
        const modules = await mergeService.list();
        res.status(200).send(modules);
    }

    async read(req: express.Request, res: express.Response) {
        const module = await mergeService.read(req.body.id);
        res.status(200).send(module);
    }

    async create(req: express.Request, res: express.Response) {
        const moduleId = await mergeService.create(req.body);
        res.status(201).send({id: moduleId});
    }

}

export default new MergeModulesController();