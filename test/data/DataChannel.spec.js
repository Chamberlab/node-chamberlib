const chai = require('chai');
chai.should();

import cl from '../../dist';
import * as fixtures from '../fixtures';

describe('cl.data.DataChannel', () => {
    it('Creates new empty data channel', () => {
        const channel = new cl.data.DataChannel();
        channel.size.should.equal(0);
    });

    it('Adds a data event to the channel', () => {
        const channel = new cl.data.DataChannel([]),
            event = new cl.events.DataEvent('12.0ms', '0.8V');

        channel.push(event);
        channel.size.should.equal(1);
        channel.at(0).time.toString().should.equal('12 ms');
        channel.at(0).value.toString().should.equal('0.8 V');
    });

    it('Adds 500 single random events to the channel', () => {
        const channel = fixtures.makeDataChannel(0);

        while (channel.size < 500) {
            channel.push(fixtures.makeDataEvent());
        }
        channel.size.should.equal(500);
    });

    it('Adds 500 random events to the channel from an array', () => {
        const channel = new cl.data.DataChannel(),
            events = [];

        while (events.size < 500) {
            events.push(fixtures.makeDataEvent());
        }

        channel.push(events);
        channel.size.should.equal(events.length);
    });
});