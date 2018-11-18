

export class AppModel {
    private appState: 'loading' | 'ready';

    public setAppState(appState: 'loading' | 'ready') {
        this.appState = appState;
    }

    public getAppState() {
        return this.appState;
    }
}
