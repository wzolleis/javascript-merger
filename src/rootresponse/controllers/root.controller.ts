import express from 'express';
import {listener} from '../../server';

// this is a simple route to make sure everything is working properly
// @ts-ignore
const runningMessage = `Server running at http://localhost:${listener.address().port}`;

class ModulesController {
    async debugMessage(req: express.Request, res: express.Response) {
        res.status(200).send(runningMessage);
    }
}