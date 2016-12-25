import chai from 'chai';
chai.should();

import cl from '../../../index';

describe('cl.nodes.transform.QuantizeTime', () => {

    it('Reduces the DataEvents to specified time steps', (cb) => {
        let results = [];
        const random = new cl.nodes.generators.Random(150),
            quantizer = new cl.nodes.transform.QuantizeTime({
                steps: new cl.quantities.Time(1000, 'ms')
            });
        quantizer.stream.on('data', function (event) {
            if (event instanceof cl.events.DataEvent) {
                results.push(event);
            }
        });
        quantizer.stream.on('end', () => {
            results.length.should.not.equal(150);
            cb();
        });
        quantizer.stream.on('error', (err) => {
            throw err;
        });

        random.stream.pipe(quantizer.stream);
    });

});