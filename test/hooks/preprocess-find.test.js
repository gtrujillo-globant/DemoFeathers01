const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const preprocessFind = require('../../src/hooks/preprocess-find');

describe('\'preprocess-find\' hook', () => {
    let app;

    beforeEach(() => {
        app = feathers();

        app.use('/dummy', {
            async get(id) {
                return { id };
            }
        });

        app.service('dummy').hooks({
            before: preprocessFind()
        });
    });

    it('runs the hook', async () => {
        const result = await app.service('dummy').get('test');
    
        assert.deepEqual(result, { id: 'test' });
    });
});
