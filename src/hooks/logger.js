/* eslint no-console: 0 */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

module.exports = function () {
    return context => {
        const app = context.app;
        // logger.debug(`${context.type} app.service('${context.path}').${context.method}()`);
    
        // if(typeof context.toJSON === 'function') {
        //     logger.debug('Hook Context', JSON.stringify(context, null, '  '));
        // }

        if (context.path === 'messages' && context.type === 'after') {
            switch (context.method) {
            case 'create':
                console.log(`Created ${JSON.stringify(context.data)}`.green);
                break;
            case 'patch':
                console.log(`Updated ${JSON.stringify(context.data)}`.magenta);
                break;
            case 'remove':
                console.log(`Removed id:${context.id}`.red);
                break;
            }
        }
    
        if (context.error) {
            app.error(context.error);
        }
    };
};
