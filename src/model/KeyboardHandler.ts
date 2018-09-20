import { MotionHandler, Direction } from './MotionHandler';

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
            const addDirectionIfDoesNotAlreadyHave = (direction: Direction) => {
                if (!this.motionHandler.hasDirection(direction)) {
                    this.motionHandler.addDirection(direction);
                }
            }

            switch(event.keyCode) {
                case Keys.FORWARD:
                    addDirectionIfDoesNotAlreadyHave(Direction.FORWARD);
                    break;
                case Keys.BACKWARD:
                    addDirectionIfDoesNotAlreadyHave(Direction.BACKWARD);
                    break;
                case Keys.LEFT:
                    this.motionHandler.setRotationDirection(Direction.LEFT);
                    break;
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection(Direction.RIGHT);
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                    this.motionHandler.removeDirection(Direction.FORWARD);
                    break;
                case Keys.BACKWARD:
                    this.motionHandler.removeDirection(Direction.BACKWARD);
                    break;
                case Keys.LEFT:
                    this.motionHandler.removeDirection(Direction.LEFT);
                    this.motionHandler.setRotationDirection(null);
                    break;
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection(null);
                    this.motionHandler.removeDirection(Direction.RIGHT);
                    break;
            }

            event.preventDefault()
        });
    }

    public unsubscribe() {

    }
}