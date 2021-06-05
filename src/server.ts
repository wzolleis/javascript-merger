import {CommonRoutesConfig} from './common/common.routes.config';
import http from 'http';
import express from 'express';
import {app, routes} from './app';
import Logger from './common/lib/logger';

const server: http.Server = http.createServer(app);
const port = 3000;
// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        Logger.info(`Routes configured for ${route.getName()}`);
    });

    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});
