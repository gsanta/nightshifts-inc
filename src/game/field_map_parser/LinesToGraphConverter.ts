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
        _.range(0, vertices).forEach(val => this.graph.addVertex(val));

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
        if (vertex > 0 && !this.graph.hasEdgeBetween(vertex, adjacentVertex)) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private addTopEdge(vertex: number) {
        const adjacentVertex = vertex + this.columns;
        if (adjacentVertex < this.graph.size() && !this.graph.hasEdgeBetween(vertex, adjacentVertex)) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private addBottomEdge(vertex: number) {
        const adjacentVertex = vertex - this.columns;
        if (adjacentVertex > 0 && !this.graph.hasEdgeBetween(vertex, adjacentVertex)) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }

    private addRightEdge(vertex: number) {
        const adjacentVertex = vertex + 1;
        if (adjacentVertex < this.graph.size() && !this.graph.hasEdgeBetween(vertex, adjacentVertex)) {
            this.graph.addEdge(vertex, adjacentVertex);
        }
    }
}
