import { Application } from '@feathersjs/express';

import messages from './messages/messages.service';

// eslint-disable-next-line no-unused-vars
export default function (app: Application<object>) {
    app.configure(messages);
};
