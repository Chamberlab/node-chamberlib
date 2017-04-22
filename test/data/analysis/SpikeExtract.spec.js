const chai = require('chai');
chai.should();

import cl from '../../../src';
import * as fixtures from '../../fixtures';
import Qty from 'js-quantities';

describe('cl.data.analysis.SpikeExtract', () => {
    it('extracts spikes from data frames crossing threshold', () => {
        const frames = fixtures.makeEvenlySpacedDataFrames(),
        spikeExtract = new cl.data.analysis.SpikeExtract(frames[0].value.length, 0.5);
        frames.forEach(frame => {
            spikeExtract.evaluate(frame);
        });
        const spikes = spikeExtract.spikes;
        spikes.should.be.Array;
        spikes[0].should.be.Array;
        spikes[0][0].should.be.instanceof(cl.events.SpikeEvent);
        spikes[0][0].time.should.be.instanceof(Qty);
        spikes[0][0].value.should.be.Array;
        spikes[0][0].peak.should.be.instanceof(cl.events.DataEvent);
        spikes[0][0].duration.should.be.instanceof(Qty);
    });
});