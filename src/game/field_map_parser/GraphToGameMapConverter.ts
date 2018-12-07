import { MatrixGraph } from './MatrixGraph';
import { ConnectedComponentFinder } from './ConnectedComponentsFinder';

export class GameMapCreator {

    public convert(graph: MatrixGraph) {
        const connectedComponentFinder = new ConnectedComponentFinder(graph);

        connectedComponentFinder
            .findConnectedComponentsForCharacter('W')
            
    }
}
