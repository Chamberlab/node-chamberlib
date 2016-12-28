import chai from 'chai';
chai.should();

import cl from '../../../src/index';

describe('cl.nodes.transform.BaseTransformNode', () => {

    it('Reads DataEvents and passes them through the supplied function', (cb) => {
        const random = new cl.nodes.generators.Random(150),
            transformer = new cl.nodes.transform.BaseTransformNode();

        let events = [];

        transformer.stream.on('data', (data) => {
            data.should.be.instanceOf(cl.events.DataEvent);
            events.push(data);
        });
        transformer.stream.on('end', () => {
            events.length.should.equal(150);
            cb();
        });
        transformer.stream.on('error', (err) => {
            throw err;
        });

        random.stream.pipe(transformer.stream);
        random.startOutput();
    });

});