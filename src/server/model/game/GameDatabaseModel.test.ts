import { GameDatabaseModel } from './GameDatabaseModel';
import { expect } from 'chai';


describe('GameDatabaseModel', () => {
    it('is invalid when world is empty', async () => {
        const model = new GameDatabaseModel();

        return model.validate()
            .catch((err) => {
                // tslint:disable-next-line:no-unused-expression
                expect(err.errors.world).to.exist;
                // tslint:disable-next-line:no-unused-expression
                expect(err.errors.userId).to.exist;
            });
    });
});
