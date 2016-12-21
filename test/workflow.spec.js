import 'babel-core/register';
const chai = require('chai');
chai.should();

import Promise from 'bluebird';
import cl from '../index';

describe('Sonification Workflow', () => {
    let set = new cl.data.DataSet();

    it('loads a json file', () => {
        return set.loadJson('/Users/anton/PycharmProjects/nanobrains/out/nb-rec-mode-2-01_groups-05_units-05_sptrs.json');
    });

    it('configure rulesets filtering the data channels', () => {
        set.all.map(function (channel) {
            channel.ruleset.push(new cl.rules.filters.HighPass(new cl.quantities.Voltage(0.04, 'mv')));
        });
    });

    it('evaluates ruleset on the available channels', () => {
        let tstart = Date.now();
        return set.evaluateRuleSets()
            .then(() => {
                console.log(`Evaluated RuleSet in ${Date.now() - tstart}s`);
            });
    });

    it('plots the resulting data to a graph', () => {

    });

    it('configure rulesets for musical mapping', () => {
        set.all.map(function (channel) {
            channel.ruleset.push(new cl.rules.mappers.VoltageToChord());
        });

        let tstart = Date.now();
        return set.evaluateRuleSets()
            .then(() => {
                console.log(`Evaluated RuleSet in ${Date.now() - tstart}s`);
            });
    });

    it('writes all created tonal events to midi file', () => {
        /* todo.... */
    });
});