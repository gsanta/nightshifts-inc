import { MatrixGraph } from './MatrixGraph';
import { ConnectedComponentFinder } from './ConnectedComponentsFinder';
import { Rectangle } from '../model/core/SceneModel';
import _ = require('lodash');

export class GraphToGameMapConverter {

    public convert(graph: MatrixGraph): Rectangle {
        const connectedComponentFinder = new ConnectedComponentFinder(graph);

        const connectedComponents = connectedComponentFinder.findConnectedComponentsForCharacter('W');
        const verticalSubComponents = this.findVerticalSlices(graph.getGraphForVertices(connectedComponents[0]));
        console.log(verticalSubComponents)
        return this.createRectangleFromVerticalVertices(graph.getGraphForVertices(verticalSubComponents[0]));
    }

    private findVerticalSlices(reducedGraph: MatrixGraph): number[][] {
        const visitedVertices = [];

        let componentVertices = reducedGraph.getAllVertices();
        const verticalSubCompnents = [];

        while (componentVertices.length > 0) {
            let actVertex = componentVertices[0];
            if (reducedGraph.getBottomNeighbour(actVertex) !== null || reducedGraph.getTopNeighbour(actVertex) !== null) {
                const subComponentVertices = this.findVerticalSubComponentForVertex(actVertex, reducedGraph);
                verticalSubCompnents.push(subComponentVertices);
                visitedVertices.push(...subComponentVertices);
                componentVertices = _.without(componentVertices, ...subComponentVertices);
            } else {
                componentVertices = _.without(componentVertices, actVertex);
            }
        }

        return verticalSubCompnents;
    }

    private findVerticalSubComponentForVertex(vertex: number, componentGraph: MatrixGraph): number[] {
        let subComponentVertices = [vertex];

        let actVertex = vertex;
        while (componentGraph.getTopNeighbour(actVertex) !== null) {
            subComponentVertices.push(componentGraph.getTopNeighbour(actVertex));
            actVertex = componentGraph.getTopNeighbour(actVertex);
        }

        actVertex = vertex;

        while (componentGraph.getBottomNeighbour(actVertex) !== null) {
            subComponentVertices.push(componentGraph.getBottomNeighbour(actVertex));
            actVertex = componentGraph.getBottomNeighbour(actVertex);
        }

        return subComponentVertices;
    }

    private createRectangleFromVerticalVertices(graph: MatrixGraph) {
        const vertices = [...graph.getAllVertices()];
        vertices.sort((a, b) => graph.getVertexPositionInMatrix(a).y - graph.getVertexPositionInMatrix(b).y);

        const startCoord = graph.getVertexPositionInMatrix(vertices[0]);
        const endCoord = graph.getVertexPositionInMatrix(_.last(vertices));
        return new Rectangle(startCoord.x, startCoord.y, startCoord.x + 1, endCoord.y);
    }
}
