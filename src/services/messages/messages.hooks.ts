import processMessage from '../../hooks/process-message';
import preprocessFind from '../../hooks/preprocess-find';

export default {
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
