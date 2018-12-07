import { MatrixGraph } from './MatrixGraph';

export class ConnectedComponentFinder {
    private graph: MatrixGraph;

    constructor(graph: MatrixGraph) {
        this.graph = graph;
    }

    public findConnectedComponentsForCharacter(character: string): number[][] {
        const reducedGraph = this.graph.getGraphForVertexValue(character);

        const connectedComps: number[][] = [];

        let actComp = [];
        reducedGraph.BFS((vertex, newRoot) => {
            if (newRoot) {
                connectedComps.push(actComp);
                actComp = [];
            }
            actComp.push(vertex);
        });

        connectedComps.push(actComp);

        return connectedComps;
    }
}
