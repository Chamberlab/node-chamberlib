import assert from 'assert';
import DataFrame from '../../events/DataFrame';

class GroupValues {
    constructor(groupMapping) {
        assert(typeof groupMapping === 'object', `groupMapping must be object, is ${typeof groupMapping}`);
        this._groupMapping = groupMapping;
        Object.keys(this._groupMapping).map(group => {
            this._groupMapping[group] = [];
        });
    }

    evaluate(event) {
        return new Promise((resolve, reject) => {
            if (event instanceof DataFrame) {
                event.value.forEach((val, i) => {
                    const group =
                    this._groupMapping[group].values.push();
                });
                resolve(event);
            } else {
                reject(new Error('Type not implemented'));
            }
        });
    }
}

export default GroupValues;