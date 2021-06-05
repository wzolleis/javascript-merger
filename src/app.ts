import express from 'express';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {ModulesRoutes} from './modules/modules.routes.config';
import {MergeModulesRoutes} from './merge_modules/merge.modules.routes.config'
import morganMiddleware from './common/lib/morgan.middleware';

export const app: express.Application = express();
export const routes: Array<CommonRoutesConfig> = [];

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// initialize the logger with the above configuration
app.use(morganMiddleware);

// here we are adding the Routes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new ModulesRoutes(app), new MergeModulesRoutes(app));