// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) { 
    return async context => {
        const { data } = context;

        // Throw an error if we didn't get a text
        if(!data.text) {
            throw new Error('A message must have a text');
        }

        // The actual message text
        const text = context.data.text
            // Messages can't be longer than 400 characters
            .substring(0, 400);

        context.data = Object.assign(context.data, { text, createdAt: (new Date()).getTime() });

        // Best practice: hooks should always return the context
        return context;
    };
};
