import express from 'express';

import modulesService from '../services/modules.service';
import logger from '../../common/lib/winston.logger.config';

class ModulesController {
    async listModules(req: express.Request, res: express.Response) {
        const modules = await modulesService.list();
        res.status(200).send(modules);
    }

    async getModuleById(req: express.Request, res: express.Response) {
        const module = await modulesService.read(req.body.id);
        res.status(200).send(module);
    }

    async createModule(req: express.Request, res: express.Response) {
        const moduleId = await modulesService.create(req.body);
        res.status(201).send({id: moduleId});
    }

    async putModule(req: express.Request, res: express.Response) {
        logger.debug(await modulesService.update(req.body.id, req.body));
        res.status(204).send();
    }

    async removeModule(req: express.Request, res: express.Response) {
        logger.debug(await modulesService.remove(req.body.id));
        res.status(204).send();
    }
}

export default new ModulesController();