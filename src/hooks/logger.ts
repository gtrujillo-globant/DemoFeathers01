/* eslint no-console: 0 */
// eslint-disable-next-line no-unused-vars
import * as colors from 'colors';

export default function () {
    return (context:any) => {
        const app = context.app;
        // logger.debug(`${context.type} app.service('${context.path}').${context.method}()`);
    
        // if(typeof context.toJSON === 'function') {
        //     logger.debug('Hook Context', JSON.stringify(context, null, '  '));
        // }

        if (context.path === 'messages' && context.type === 'after') {
            switch (context.method) {
            case 'create':
                console.log(colors.green(`Created ${JSON.stringify(context.data)}`));
                break;
            case 'patch':
                console.log(colors.magenta(`Updated ${JSON.stringify(context.data)}`));
                break;
            case 'remove':
                console.log(colors.red(`Removed id:${context.id}`));
                break;
            }
        }
    
        if (context.error) {
            app.error(context.error);
        }
    };
};
