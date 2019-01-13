import { TemplateCreator } from "./TemplateCreator";
import { Promise } from 'es6-promise';

/** 
 * Should be used as an interface for `TemplateCreator`s which e.g
 * load their model from file, so those `TemplateCreator`s need to work
 * asyncronously.
 */
export interface AsyncTemplateCreator extends TemplateCreator {
    doAsyncWork(): Promise<void>;
}