import { UndirectedGraph } from './UndirectedGraph';
import _ = require('lodash');


export class LinesToGraphConverter {
    private graph: UndirectedGraph;
    private lines: string[];
    private columns: number;
    private rows: number;

    public parse(lines: string[]): UndirectedGraph {
        this.graph = new UndirectedGraph();
        this.lines = lines;
        this.columns = this.lines[0].length;
        this.rows = this.lines.length;
        this.initGraph();
        this.parseLines(lines);

        return this.graph;
    }

    private initGraph() {
        const vertices = this.lines[0].length * this.lines.length;
        const findCharacter = (index) => {
            const row = Math.floor(index / this.columns);
            const column = index % this.columns;

            return this.lines[row][column];
        };

        _.range(0, vertices).forEach(val => this.graph.addVertex(val, findCharacter(val)));

        this.parseLines(this.lines);
    }

    private parseLines(lines: string[]) {
        lines.forEach((line, index) => this.parseLine(line, index));
    }

    private parseLine(line: string, lineIndex: number) {
        line.split('').forEach((vertex, index) => this.addEdgesForVertex(lineIndex * line.length + index));
    }

    private addEdgesForVertex(vertex: number) {
        this.addLeftEdge(vertex);
        this.addTopEdge(vertex);
        this.addRightEdge(vertex);
        this.addBottomEdge(vertex);
    }

    private addLeftEdge(vertex: number) {
        const adjacentVertex = vertex - 1;
        if (this.hasNeighbourOnTheLeft(vertex) && !this.graph.hasEdgeBetween(vertex, adjacentVertex)) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private hasNeighbourOnTheLeft(vertex: number) {
        return vertex > 0 && vertex % this.columns !== 0;
    }

    private addBottomEdge(vertex: number) {
        const adjacentVertex = vertex + this.columns;
        if (
            this.hasNeighbourOnTheBottom(vertex) &&
            !this.graph.hasEdgeBetween(vertex, adjacentVertex) &&
            this.graph.getVertexValue(vertex) === this.graph.getVertexValue(adjacentVertex)
        ) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private hasNeighbourOnTheBottom(vertex: number) {
        return vertex < this.graph.size() - this.columns;
    }

    private addTopEdge(vertex: number) {
        const adjacentVertex = vertex - this.columns;
        if (
            this.hasNeighbourOnTheTop(vertex) &&
            !this.graph.hasEdgeBetween(vertex, adjacentVertex) &&
            this.graph.getVertexValue(vertex) === this.graph.getVertexValue(adjacentVertex)
        ) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private hasNeighbourOnTheTop(vertex: number) {
        return vertex >= this.columns;
    }

    private addRightEdge(vertex: number) {
        const adjacentVertex = vertex + 1;
        if (
            this.hasNeighbourOnTheRight(vertex) &&
            !this.graph.hasEdgeBetween(vertex, adjacentVertex) &&
            this.graph.getVertexValue(vertex) === this.graph.getVertexValue(adjacentVertex)
        ) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private hasNeighbourOnTheRight(vertex: number) {
        return vertex % this.columns !== this.columns - 1;
    }
}