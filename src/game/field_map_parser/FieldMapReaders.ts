import {createInterface, ReadLine} from 'readline';
import { Promise } from 'mongoose';
import { FieldMap } from './FieldMap';
import * as _ from 'lodash';
import { UndirectedGraph } from './UndirectedGraph';
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

        const graph: UndirectedGraph = null;
        const lines: string[] = [];
        return new Promise((resolve, reject) => {
            this.readline.on('line', (line) => {
                lines.push(line);
            });

            this.readline.on('close', () => {
                // this.initGraph(lines);
                resolve(fieldMap);
            });

            this.readline.on('error', () => {
                reject();
            });
        });
    }

    // private initGraph(lines: string[]): UndirectedGraph {
    //     const vertices = lines[0].length * lines.length;
    //     const graph = new UndirectedGraph();
    //     _.range(0, vertices).forEach(val => graph.addVertex(val));
    //     return graph;
    // }

    private parseLines(lines: string[]) {
        lines.forEach((line, index) => this.parseLine(line, index));
    }

    parseLine(line: string, lineIndex: number) {
        // line.split('').forEach()
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
