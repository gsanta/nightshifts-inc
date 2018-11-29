import { EventEmitter } from 'events';
import { AppModel } from './AppModel';


export class AppStore extends EventEmitter {
    private appModel: AppModel;

    constructor() {
        super();
        this.appModel = {
            appState: 'loading',
            dataLoadingState: 'loaded',
            lastActiontType: null
        };
    }

    public setModel(appModel: AppModel) {
        this.appModel = appModel;
        this.emitChange();
    }

    public getModel() {
        return this.appModel;
    }

    public onChange(eventHandler: () => void) {
        this.on('change', eventHandler);
    }

    public offChange(eventHandler: () => void) {
        this.removeListener('change', eventHandler);
    }

    private emitChange() {
        this.emit('change');
    }
}
