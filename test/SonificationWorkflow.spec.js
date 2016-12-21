import 'babel-core/register';
import 'babel-polyfill';

const chai = require('chai');
chai.should();

import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import cl from '../index';

describe('Sonification Workflow', () => {
    let chance = new Chance(),
        title = [Date.now(), chance.word({syllables: 2}), chance.word({syllables: 2})].join('-'),
        sdir = path.join(__dirname, 'test-sets'),
        fdir = path.join(sdir, title),
        datafile = path.join(__dirname, 'assets', 'data.json'),
        set = new cl.data.DataSet();

    if (!fs.existsSync(sdir)) {
        fs.mkdirSync(sdir);
    }
    if (!fs.existsSync(fdir)) {
        fs.mkdirSync(fdir);
    }

    it('loads a json file', () => {
        return set.loadJson(datafile, title);
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

    it('plots the resulting data to a line chart', () => {
        const plotter = new cl.graphs.DataPlotter(set, sdir, title);
        return plotter.generateChart(cl.graphs.layouts.LineChart);
    });

    it('plots the resulting data to a stacked stream chart', () => {
        const plotter = new cl.graphs.DataPlotter(set, sdir, title);
        return plotter.generateChart(cl.graphs.layouts.StackedStreamChart);
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
        /* TODO: do.... */
    });

    it('stores the modified dataset with the other files', () => {
        return Promise.promisify(fs.writeFile)(
            path.join(__dirname, 'test-sets', title, title + '.json'), JSON.stringify(set));
    });
});