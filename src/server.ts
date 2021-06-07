import {CommonRoutesConfig} from './common/common.routes.config';
import http from 'http';
import {app, routes} from './app';
import Logger from './common/lib/winston.logger.config';
import {AddressInfo} from "net";

const server: http.Server = http.createServer(app);
const port = 3000;

const isAdressInfo = (info: AddressInfo | string | null) => {
    return (info as AddressInfo).port !== undefined
}

export const listener = server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        Logger.info(`Routes configured for ${route.getName()}`);
    });

    // @ts-ignore
    const address = listener.address()
    if (isAdressInfo(address)) {
        const addressInfo = address as AddressInfo
        Logger.info(`Listening on port ${addressInfo.port}`)
    } else {
        Logger.info(`started application`)
    }

    Logger.info("....")
    Logger.info("build and use CLI interface")
    Logger.info("e.g.node dist/merger-cli.js --help")
    Logger.info("....")
    Logger.info("terminating server now....")
    process.exit(0)
});

// our only exception to avoiding console.log(), because we
// always want to know when the server is done starting up

