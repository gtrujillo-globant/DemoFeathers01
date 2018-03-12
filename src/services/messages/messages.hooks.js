const processMessage = require('../../hooks/process-message');
const preprocessFind = require('../../hooks/preprocess-find');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [processMessage()],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [preprocessFind()],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
