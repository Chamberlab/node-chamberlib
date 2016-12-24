const chai = require('chai');
chai.should();

import clab from '../../index';
import * as fixtures from '../fixtures';

describe('RuleSet', () => {
    it('Creates an empty ruleset', () => {
        let set = new clab.rules.RuleSet();

        set.should.be.instanceOf(clab.rules.RuleSet);
        set.size.should.equal(0);
    });

    it('Adds a single filter rule', () => {
        let set = new clab.rules.RuleSet(),
            rule = new clab.rules.filters.HighPass(new clab.quantities.Voltage(0.5, 'mV'));

        set.push(rule);

        set.should.be.instanceOf(clab.rules.RuleSet);
        set.size.should.equal(1);
    });

    it('Evaluates ruleset', () => {
        let channel = fixtures.makeDataChannel(500, clab.quantities.Voltage),
            set = new clab.rules.RuleSet(),
            rule = new clab.rules.filters.HighPass(new clab.quantities.Voltage(0.5, 'mV'));

        set.push(rule);

        let res = set.evaluate(channel);
    });
});