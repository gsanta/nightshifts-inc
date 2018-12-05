export class UndirectedGraph {
    private numberOfVertices = 0;
    private adjacencyList: {[key: number]: number[]} = {};

    public size() {
        return this.numberOfVertices;
    }

    public addVertex(vertex: number) {
        this.adjacencyList[vertex] = [];
        this.numberOfVertices += 1;
    }

    public addEdge(v, w) {
        this.adjacencyList[v].push(w);
        this.adjacencyList[w].push(v);
    }

    public getAjacentEdges(vertex: number) {
        return this.adjacencyList[vertex];
    }

    public hasEdgeBetween(v1: number, v2: number) {
        return this.adjacencyList[v1].indexOf(v2) !== -1;
    }
}
