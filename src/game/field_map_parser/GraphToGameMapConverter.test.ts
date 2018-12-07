import { LinesToGraphConverter } from './LinesToGraphConverter';
import { GraphToGameMapConverter } from './GraphToGameMapConverter';
import { expect } from 'chai';

describe('GraphToGameMapConverter', () => {
    describe('convert', () => {
        it.only('creates a graph which describes the map represented by the input string', () => {
            const linesToGraphConverter = new LinesToGraphConverter();
            const graph = linesToGraphConverter.parse([
                '######',
                '#WWWW#',
                '#W####',
                '######'
            ]);


            const graphToGrameMapConverter = new GraphToGameMapConverter();
            const gameMap = graphToGrameMapConverter.convert(graph);

            expect(gameMap).to.equal();
        });
    });
});
