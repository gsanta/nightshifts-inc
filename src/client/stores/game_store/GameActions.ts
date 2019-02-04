

export class GameActions {

    public loadUser() {
        this.userQuery.fetchUser()
            .then(user => {
                this.userStore.setModel(user);
            })
            .finally(() => {
                const appModel: AppModel = {...this.appStore.getModel(), appState: 'ready'};
                this.appStore.setModel(appModel);
            });
    }
}
