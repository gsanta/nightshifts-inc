export class UndirectedGraph {
    private numberOfVertices = 0;
    private adjacencyList: {[key: number]: number[]} = {};
    private vertexValues: {[key: number]: string} = {};
    private edges: [number, number][] = [];

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
    }

    public addEdge(v, w) {
        this.adjacencyList[v].push(w);
        this.adjacencyList[w].push(v);
        this.edges.push([v, w]);
    }

    public getAllEdges(): [number, number][] {
        return this.edges;
    }

    public getAjacentEdges(vertex: number) {
        return this.adjacencyList[vertex];
    }

    public hasEdgeBetween(v1: number, v2: number) {
        return this.adjacencyList[v1].indexOf(v2) !== -1;
    }
}
