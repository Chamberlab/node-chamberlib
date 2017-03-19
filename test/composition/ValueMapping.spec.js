const chai = require('chai');
chai.should();

import * as fixtures from '../fixtures';
import clab from '../../src/index';

describe('cl.composition.ValueMapping', () => {
    it('Maps mV values to Notes', () => {
        const lut = new clab.data.lut.VoltageToNote();

        const tonalEvents = fixtures.makeEvenlySpacedDataEvents(16).map(evt => {
            const value = lut.query(evt.value);
            return value ? new clab.events.TonalEvent(
                new clab.quantities.Time(evt.time.normalized(), evt.time.defaultUnit),
                value,
                new clab.quantities.Time(1.0, evt.time.defaultUnit)
            ) : null;
        });

        tonalEvents.length.should.equal(16);
    });
});