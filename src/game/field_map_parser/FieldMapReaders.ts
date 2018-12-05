import {createInterface, ReadLine} from 'readline';
import { Promise } from 'mongoose';
import { FieldMap } from './FieldMap';
import * as _ from 'lodash';
const fs = require('fs');

export const defaultMap = `
##################################################################
#WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#W#############################################################W##
#WWWWWWWWWWWWWWWWWWWW##WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW##
##################################################################
`;

class Graph {
    private numberOfVertices: number;
    private adjacencyList: {[key: number]: number[]} = {};

    constructor(numberOfVertices: number) {
        this.numberOfVertices = numberOfVertices;
    }

    public addVertex(vertex: number) {
        this.adjacencyList[vertex] = [];
    }

    public addEdge(v, w) {
        this.adjacencyList[v].push(w);
        this.adjacencyList[w].push(v);
    }
}

export class FieldMapReader {
    private readline: ReadLine;

    private constructor(readable: ReadableStream) {
        this.readline = createInterface({
            input: <any> readable,
            crlfDelay: Infinity
        });
    }


    read(): Promise<FieldMap> {
        const fieldMap = {
            walls: []
        };

        const graph: Graph = null;
        return new Promise((resolve, reject) => {
            this.readline.on('line', (line) => {
                if (!graph) {
                    this.initGraph(line);
                }
            });

            this.readline.on('close', () => {
                resolve(fieldMap);
            });

            this.readline.on('error', () => {
                reject();
            });
        });
    }

    private initGraph(inputRow: string): Graph {
        const graph = new Graph(inputRow.length);
        _.range(0, inputRow.length).forEach(val => graph.addVertex(val));
        return graph;
    }

    public static fromString(map: string) {
        const Readable = require('stream').Readable;
        const s = new Readable();
        s._read = () => {}; // redundant? see update below
        s.push(map);
        s.push(null);

        return new FieldMapReader(s);
    }
}
