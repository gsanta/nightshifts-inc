import { ConnectedComponentFinder } from './ConnectedComponentsFinder';
import { MatrixGraph } from './MatrixGraph';
import { LinesToGraphConverter } from './LinesToGraphConverter';


describe('ConnectedComponentsFinder', () => {
    describe('findConnectedComponentsForCharacter', () => {
        it.only('returns a list of connected components for the given parameter', () => {

            const input = [
                '##WW##',
                '######',
                '##W###',
                '##W###',
                '##WW##',
            ];

            const linesToGraphConverter = new LinesToGraphConverter();
            const graph = linesToGraphConverter.parse(input);

            const connectedComponentFinder = new ConnectedComponentFinder(graph);
            const connectedComponents = connectedComponentFinder.findConnectedComponentsForCharacter('W');
        });
    });
});
