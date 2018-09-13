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
            switch(event.keyCode) {
                case Keys.FORWARD:
                    this.motionHandler.addDirection(Direction.FORWARD);
                    break;
                case Keys.BACKWARD:
                    this.motionHandler.addDirection(Direction.BACKWARD);
                    break;
                case Keys.LEFT:
                    this.motionHandler.addDirection(Direction.LEFT);
                    break;
                case Keys.RIGHT:
                    this.motionHandler.addDirection(Direction.RIGHT);
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
                    break;
                case Keys.RIGHT:
                    this.motionHandler.removeDirection(Direction.RIGHT);
                    break;
            }

            event.preventDefault()
        });
    }

    public unsubscribe() {

    }
}