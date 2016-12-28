const chai = require('chai');
chai.should();

import Chance from 'chance';
const chance = new Chance();

import path from 'path';
import fs from 'fs';
import cl from '../../../src/index';

describe('cl.nodes.output.GraphNode', () => {
    it('Generates a LineChart graph', (cb) => {
        const filename = chance.word({syllables: 3}),
            filePath = path.resolve('./test/assets/' + filename),
            graph = new cl.nodes.output.GraphNode(filePath),
            random = new cl.nodes.generators.Random(10, 1);
        graph.on('done', () => {
            ['.svg', '.png'].forEach((ext) => {
                fs.existsSync(path.join(filePath, filename + '--LineChart' + ext)).should.be.true;
                fs.unlinkSync(path.join(filePath, filename + '--LineChart' + ext));
            });
            fs.rmdirSync(path.join(filePath));
            cb();
        });
        graph.on('error', (err) => {
            cb(err);
        });
        random.stream.pipe(graph.input);
        random.startOutput();
    });
});