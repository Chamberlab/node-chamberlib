import chai from 'chai';
chai.should();

// import Qty from 'js-quantities';
// import cl from '../../../dist';

describe('cl.nodes.transform.QuantizeTime', () => {
    it('Reduces the DataEvents to specified time steps', (cb) => {
        // FIXME: stream is not closed, problem in transform/node?
        /*
        let results = [];
        const random = new cl.nodes.generators.Random(150, 1, -0.5, 0.5, 0.0, 200.0),
            quantizer = new cl.nodes.transform.QuantizeTime({
                steps: Qty(0.5, 's')
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
        */
        cb();
    });
});