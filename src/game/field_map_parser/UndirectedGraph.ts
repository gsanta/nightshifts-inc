import _ = require("lodash");

export class UndirectedGraph {
    private numberOfVertices = 0;
    private adjacencyList: { [key: number]: number[] } = {};
    private vertexValues: { [key: number]: string } = {};
    private edges: [number, number][] = [];
    private vertices: number[] = [];

    public size() {
        return this.numberOfVertices;
    }

    public getVertexValue(vertex: number): string {
        return this.vertexValues[vertex];
    }

    public addVertex(vertex: number, vertexValue: string) {
        this.adjacencyList[vertex] = [];
        this.vertexValues[vertex] = vertexValue;
        this.numberOfVertices += 1;
        this.vertices.push(vertex);
    }

    public addEdge(v, w) {
        this.adjacencyList[v].push(w);
        this.adjacencyList[w].push(v);
        this.edges.push([v, w]);
    }

    public getAllEdges(): [number, number][] {
        return this.edges;
    }

    public getAllVertices(): number[] {
        return this.vertices;
    }

    public getAjacentEdges(vertex: number) {
        return this.adjacencyList[vertex];
    }

    public hasEdgeBetween(v1: number, v2: number) {
        return this.adjacencyList[v1].indexOf(v2) !== -1;
    }

    public getGraphForVertexValue(val: string): UndirectedGraph {
        const graph = new UndirectedGraph();
        this.getAllVertices()
            .filter(vertex => this.getVertexValue(vertex) === val)
            .forEach(vertex => graph.addVertex(vertex, this.getVertexValue(vertex)));

        graph.getAllVertices().forEach(vertex => {

            const neighbours = this.getAjacentEdges(vertex);

            neighbours.forEach(neighbour => {
                if (this.getVertexValue(neighbour) === val && !graph.hasEdgeBetween(vertex, neighbour)) {
                    graph.addEdge(vertex, neighbour);
                }
            });
        });

        return graph;
    }

    public BFS(rootVertex: number, callback: (vertex: number) => void) {
        const queue = [rootVertex];
        const visited: number[] = [];

        while (queue.length > 0) {

            const vertex = queue.shift();
            visited.push(vertex);
            callback(vertex);

            let notVisitedNeighbours = this.getAjacentEdges(vertex);
            notVisitedNeighbours = _.without(notVisitedNeighbours, ...visited);
            if (notVisitedNeighbours.length === 0) {
                continue;
            }

            for (let i = 0; i < notVisitedNeighbours.length; i++) {
                queue.push(notVisitedNeighbours[i]);
            }
        }
    }
}

// while (!vertexQueue.isEmpty()) {
//     const currentVertex = vertexQueue.dequeue();
//     callbacks.enterVertex({ currentVertex, previousVertex });

//     // Add all neighbors to the queue for future traversals.
//     graph.getNeighbors(currentVertex).forEach((nextVertex) => {
//       if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
//         vertexQueue.enqueue(nextVertex);
//       }
//     });

//     callbacks.leaveVertex({ currentVertex, previousVertex });

//     // Memorize current vertex before next loop.
//     previousVertex = currentVertex;
//   }
