import {createInterface, ReadLine} from 'readline';
import { Promise } from 'mongoose';
import { FieldMap } from './FieldMap';
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
        return new Promise((resolve, reject) => {
            this.readline.on('line', (line) => {
                console.log(`Line from file: ${line}`);
            });

            this.readline.on('close', () => {
                resolve(fieldMap);
            });

            this.readline.on('error', () => {
                reject();
            });
        });
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
