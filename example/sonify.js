#!/usr/bin/env babel-node

import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import cl from '../index';

Promise.coroutine(function* () {
    const tstart = Date.now(), chance = new Chance(), set = new cl.data.DataSet(),
        title = [Date.now(), chance.word({syllables: 2}), chance.word({syllables: 2})].join('-'),
        sdir = path.join(__dirname, 'output'), fdir = path.join(sdir, title),
        datafile = path.join(__dirname, '..', 'test', 'assets', 'data.json');

    if (!fs.existsSync(sdir)) {
        fs.mkdirSync(sdir);
    }
    if (!fs.existsSync(fdir)) {
        fs.mkdirSync(fdir);
    }

    yield set.loadJson(datafile, title);

    set.all.map(function (channel) {
        channel.ruleset.push(new cl.rules.filters.HighPass(new cl.quantities.Voltage(0.04, 'mv')));
    });

    yield set.evaluateRuleSets();

    const plotter = new cl.graphs.DataPlotter(set, fdir, title);

    yield plotter.generateChart(cl.graphs.layouts.LineChart);
    yield plotter.generateChart(cl.graphs.layouts.StackedStreamChart);

    yield Promise.promisify(fs.writeFile)(
        path.join(__dirname, 'output', title, title + '.json'), JSON.stringify(set));

    let song = new cl.harmonics.Song(set.size);

    set.all.map(function (channel) {
        channel.ruleset.push(new cl.rules.transformers.VoltageToChord('C'));
        channel.ruleset.push(new cl.rules.routers.BaseRouter(song));
    });

    yield set.evaluateRuleSets();

    song.toMidiFile(path.join(__dirname, 'output', title, title + '.mid'));
    console.log(`Time spent: ${(Date.now() - tstart) * 0.001}s`);
})();