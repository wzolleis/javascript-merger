import express from 'express';

// this is a simple route to make sure everything is working properly
// @ts-ignore
const runningMessage = `Server running at http://localhost`;

class RootController {
    async welcomeMessage(req: express.Request, res: express.Response) {
        res.status(200).send(runningMessage);
    }
}

export default new RootController()