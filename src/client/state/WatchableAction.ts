

export interface WatchableAction<T> {
    request(payload: T);
    watch();
}

export interface WatchableActionConstructor<T> {
    new (): WatchableAction<T>;
    prototype: any;
}
