import express from 'express';

import mergeService from '../services/merge.module.service';
import logger from '../../common/lib/winston.logger.config'


class MergeModulesController {
    constructor() {
        logger.debug("created   merge_module controller")
    }

    async list(req: express.Request, res: express.Response) {
        const result = await mergeService.list();

        res.status(200).send(result);
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