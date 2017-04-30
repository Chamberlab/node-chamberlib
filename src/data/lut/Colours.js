import Levenshtein from 'levenshtein';
import Chance from 'chance';

class Colours {
    constructor(size, minDistance, minSum = 255, allowRepetitions = false) {
        const chance = new Chance();

        this._colours = [];

        while (this._colours.length < size) {
            let min_d = 255,
                c = chance.color({format: 'rgb'}),
                cp = c.split(','),
                csum = parseInt(cp[0].replace('rgb(', '')) +
                    parseInt(cp[1]) + parseInt(cp[2].replace('(', ''));

            if (csum < minSum) {
                continue;
            }

            for (let cl of this._colours) {
                let lev = new Levenshtein(c.toString(), cl);
                if (lev.distance < min_d) {
                    min_d = lev.distance;
                }
            }

            if (allowRepetitions || min_d > minDistance) {
                this._colours.push(c.toString());
            }
        }
    }

    get colours() {
        return this._colours;
    }
}

export default Colours;