// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// This is an example of post-processing a response before being sent to the user
// the same result could be obtained via queries in the client library
// e.g. app.service('messages').find({ query: { $sort: { createdAt: 1 } } });

// eslint-disable-next-line no-unused-vars
export default function (options = {}) {
    return async (context: any) => {
        const { result: { data } } = context;

        const sortedData = data.sort((a: any,b: any) => a.createdAt > b.createdAt);
        context.dispatch = Object.assign(context.result, { data: sortedData });

        return context;
    };
};
