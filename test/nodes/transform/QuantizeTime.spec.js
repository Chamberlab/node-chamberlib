import chai from 'chai';
chai.should();

import cl from '../../../src/index';

describe('cl.nodes.transform.QuantizeTime', () => {

    it('Reduces the DataEvents to specified time steps', (cb) => {
        let results = [];
        const random = new cl.nodes.generators.Random(150, 1, -0.5, 0.5, 0.0, 200.0),
            quantizer = new cl.nodes.transform.QuantizeTime({
                steps: new cl.quantities.Time(0.5, 's')
            });
        quantizer.stream.on('data', function (event) {
            if (event instanceof cl.events.DataEvent) {
                results.push(event);
            }
        });
        quantizer.stream.on('end', () => {
            results.length.should.be.lessThan(150);
            results.length.should.be.greaterThan(0);
            cb();
        });
        quantizer.stream.on('error', (err) => {
            throw err;
        });

        random.stream.pipe(quantizer.stream);
        random.startOutput();
    });

});