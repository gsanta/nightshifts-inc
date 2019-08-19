import { ControllerFacade } from './ControllerFacade';

export class SettingsController {
    language: 'en' | 'hu';

    readonly controllers: ControllerFacade;

    constructor(controllers: ControllerFacade) {
        this.controllers = controllers;
    }

    setLanguage(language: 'en' | 'hu') {
        this.language = language;

        this.controllers.renderController.render();
    }
}
