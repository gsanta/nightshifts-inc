import { MotionHandler, Movement } from './MotionHandler';

export enum Keys {
     FORWARD = 38,
     BACKWARD = 40,
     LEFT = 37,
     RIGHT = 39
}

export class KeyboardHandler {
    private motionHandler: MotionHandler;

    constructor(motionHandler: MotionHandler) {
        this.motionHandler = motionHandler;
    }

    public subscribe() {
        document.addEventListener('keydown', (event) => {
            const addDirectionIfDoesNotAlreadyHave = (direction: Movement) => {
                if (!this.motionHandler.hasDirection(direction)) {
                    this.motionHandler.addDirection(direction);
                }
            }

            switch(event.keyCode) {
                case Keys.FORWARD:
                    addDirectionIfDoesNotAlreadyHave(Movement.FORWARD);
                    break;
                case Keys.BACKWARD:
                    addDirectionIfDoesNotAlreadyHave(Movement.BACKWARD);
                    break;
                case Keys.LEFT:
                    this.motionHandler.setRotationDirection(Movement.LEFT);
                    break;
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection(Movement.RIGHT);
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                    this.motionHandler.removeDirection(Movement.FORWARD);
                    break;
                case Keys.BACKWARD:
                    this.motionHandler.removeDirection(Movement.BACKWARD);
                    break;
                case Keys.LEFT:
                    this.motionHandler.removeDirection(Movement.LEFT);
                    this.motionHandler.setRotationDirection(null);
                    break;
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection(null);
                    this.motionHandler.removeDirection(Movement.RIGHT);
                    break;
            }

            event.preventDefault()
        });
    }

    public unsubscribe() {

    }
}