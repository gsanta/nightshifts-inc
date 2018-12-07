import {createInterface, ReadLine} from 'readline';
import { Promise } from 'mongoose';
import { GameMap } from './GameMap';
import * as _ from 'lodash';
import { MatrixGraph } from './MatrixGraph';
import { LinesToGraphConverter } from './LinesToGraphConverter';
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

export class GameMapReader {
    private readline: ReadLine;

    private constructor(readable: ReadableStream) {
        this.readline = createInterface({
            input: <any> readable,
            crlfDelay: Infinity
        });
    }


    read(): Promise<GameMap> {
        return null;
    }

    private readIntoGraph(): Promise<MatrixGraph> {
        return new Promise((resolve, reject) => {
            const lines: string[] = [];

            this.readline.on('line', (line) => {
                lines.push(line);
            });

            this.readline.on('close', () => {
                resolve(lines);
            });

            this.readline.on('error', (e) => {
                reject(e);
            });
        })
        .then((lines: string[]) => {
            const linesToGraphConverter = new LinesToGraphConverter();

            return linesToGraphConverter.parse(lines);
        });
    }

    public static fromString(map: string) {
        const Readable = require('stream').Readable;
        const s = new Readable();
        s._read = () => {}; // redundant? see update below
        s.push(map);
        s.push(null);

        return new GameMapReader(s);
    }
}
