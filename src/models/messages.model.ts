import * as NeDB from 'nedb';
import * as path from 'path';
import { Application } from '@feathersjs/express';

export default function (app: Application<object>) {
    const dbPath = app.get('nedb');
    const Model = new NeDB({
        filename: path.join(dbPath, 'messages.db'),
        autoload: true
    });

    return Model;
};
