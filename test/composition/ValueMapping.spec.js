const chai = require('chai');
chai.should();

import * as fixtures from '../fixtures';
import cl from '../../src/index';

describe('cl.composition.ValueMapping', () => {
    it('Maps mV values to Notes', () => {
        const lut = new cl.data.lut.VoltageToNote();

        const tonalEvents = fixtures.makeEvenlySpacedDataEvents(16).map(evt => {
            const value = lut.query(evt.value);
            return value ? new cl.events.TonalEvent(
                new cl.quantities.Time(evt.time.normalized(), evt.time.defaultUnit),
                value,
                new cl.quantities.Time(1.0, evt.time.defaultUnit)
            ) : null;
        });

        tonalEvents.length.should.equal(16);
    });
});