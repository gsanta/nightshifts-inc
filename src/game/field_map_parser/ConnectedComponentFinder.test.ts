import { ConnectedComponentFinder } from './ConnectedComponentsFinder';
import { UndirectedGraph } from './UndirectedGraph';
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

            const reducedGraph = graph.getGraphForVertexValue('W');

            const rootVertex = reducedGraph.getAllVertices()[0];
            reducedGraph.BFS(rootVertex, (vertex) => {
                console.log(vertex);
            });
        });
    });
});
