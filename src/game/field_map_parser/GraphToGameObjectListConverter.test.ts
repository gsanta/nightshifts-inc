import { LinesToGraphConverter } from './LinesToGraphConverter';
import { GraphToGameObjectListConverter } from './GraphToGameObjectListConverter';
import { expect } from 'chai';
import { GameObject } from './GameObject';
import { Rectangle } from '../model/core/SceneModel';

describe('GraphToGameObjectListConverter', () => {
    describe('convert', () => {
        it('creates game objects from the graph (test case with one connected component)', () => {
            const linesToGraphConverter = new LinesToGraphConverter();
            const graph = linesToGraphConverter.parse([
                '######',
                '#WWWWW',
                '#W#W##',
                '######'
            ]);


            const graphToGrameMapConverter = new GraphToGameObjectListConverter();
            const gameMap = graphToGrameMapConverter.convert(graph);

            expect(gameMap).to.eql([
                new GameObject('W', new Rectangle(1, 1, 1, 2)),
                new GameObject('W', new Rectangle(3, 1, 1, 2)),
                new GameObject('W', new Rectangle(2, 1, 1, 1)),
                new GameObject('W', new Rectangle(4, 1, 2, 1))
            ]);
        });

        it('creates game objects from the graph (test case with multiple connected components)', () => {
            const linesToGraphConverter = new LinesToGraphConverter();
            const graph = linesToGraphConverter.parse([
                '######',
                '#WWWW#',
                '#W####',
                '##WW##'
            ]);


            const graphToGrameMapConverter = new GraphToGameObjectListConverter();
            const gameMap = graphToGrameMapConverter.convert(graph);

            expect(gameMap).to.eql([
                new GameObject('W', new Rectangle(1, 1, 1, 2)),
                new GameObject('W', new Rectangle(2, 1, 3, 1)),
                new GameObject('W', new Rectangle(2, 3, 2, 1))
            ]);
        });
    });
});
