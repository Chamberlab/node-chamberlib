const chai = require('chai');
chai.should();

import Chance from 'chance';
const chance = new Chance();

import path from 'path';
import fs from 'fs';
import cl from '../../../index';

describe('cl.nodes.output.GraphNode', () => {
    it('Generates a LineChart graph', (cb) => {
        const filePath = path.resolve('./test/assets/' + chance.word({syllables: 3})),
            graph = new cl.nodes.output.GraphNode(filePath),
            random = new cl.nodes.generators.Random(200);
        graph.on('done', () => {
            ['.svg', '.png'].forEach((ext) => {
                fs.existsSync(filePath + '-LineChart' + ext).should.be.true;
                fs.unlinkSync(filePath + '-LineChart' + ext);
            });
            cb();
        });
        graph.on('error', (err) => {
            cb(err);
        });
        random.stream.pipe(graph.input);
    });
});