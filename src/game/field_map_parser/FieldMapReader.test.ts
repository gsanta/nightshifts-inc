
/* tslint:disable:no-unused-expression*/
import { expect } from 'chai';
import 'mocha';
import { FieldMapReader } from './FieldMapReaders';

describe('FieldMapReader', () => {
    it('resolves the promise if there is no error', (done) => {
        const fieldMapReader = FieldMapReader.fromString('abcderfd');
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
