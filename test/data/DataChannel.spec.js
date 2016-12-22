const chai = require('chai');
chai.should();

import Chance from 'chance';
const chance = new Chance();

import clab from '../../src/index';
import * as fixtures from '../fixtures';

describe('DataChannel', () => {
    it('Creates new empty data channel', () => {
        let channel = new clab.data.DataChannel();

        channel.size.should.equal(0);
    });

    it('Adds a data event to the channel', () => {
        let channel = new clab.data.DataChannel([], ),
            time = new clab.quantities.Time(12.0, 'ms'),
            volt = new clab.quantities.Voltage(0.8, 'v'),
            event = new clab.events.DataEvent(time, volt);

        channel.push(event);
        channel.size.should.equal(1);
        channel.at(0).time.should.equal(time);
        channel.at(0).value.should.equal(volt);
    });

    it('Adds 500 single random events to the channel', () => {
        let channel = fixtures.makeDataChannel(0, clab.quantities.Voltage);

        while (channel.size < 500) {
            channel.push(fixtures.makeDataEvent(clab.quantities.Voltage));
        }

        channel.size.should.equal(500);
    });

    it('Adds 500 random events to the channel from an array', () => {
        let channel = new clab.data.DataChannel(),
            events = [];

        while (events.size < 500) {
            events.push(fixtures.makeDataEvent(clab.quantities.Voltage));
        }

        channel.push(events);
        channel.size.should.equal(events.length);
    });
});