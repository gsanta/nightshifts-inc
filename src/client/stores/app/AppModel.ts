

export interface AppModel {
    appState: 'loading' | 'ready';
    dataLoadingState: 'loading' | 'recently_loaded' | 'loaded';
}
