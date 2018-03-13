import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import * as express from '@feathersjs/express';
import primus from '@feathersjs/primus';

// import logger = require('feathers-logger');
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';

const app: express.Application<object> = express.default(feathers());

// Load app configuration
app.configure(configuration());

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());

app.configure(primus({ transformer: 'engine.io' }));
// Configure other middleware (see `middleware/index.js`)

app.configure(middleware);

// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);
// Configure logger
// app.configure(logger());

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
// app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

export default app;
