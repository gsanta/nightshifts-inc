
/* tslint:disable:no-unused-expression*/
import { expect } from 'chai';
import 'mocha';
import { GameMapReader } from './GameMapReader';

describe('GameMapReader', () => {
    it('resolves the promise if there is no error', (done) => {
        const fieldMapReader = GameMapReader.fromString('abcderfd');
        fieldMapReader.read()
            .then(() => {
                expect(1).to.equal(1);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
});
