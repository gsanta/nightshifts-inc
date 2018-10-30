import { ManualMotionStrategy } from './creature/motion/ManualMotionStrategy';

export enum Keys {
     FORWARD = 38,
     BACKWARD = 40,
     LEFT = 37,
     RIGHT = 39
}

export class KeyboardHandler {
    private motionHandler: ManualMotionStrategy;

    constructor(motionHandler: ManualMotionStrategy) {
        this.motionHandler = motionHandler;
    }

    public subscribe() {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                    this.motionHandler.setDirection('forward')
                    break;
                case Keys.BACKWARD:
                    this.motionHandler.setDirection('backward')
                    break;
                case Keys.LEFT:
                    this.motionHandler.setRotationDirection('left');
                    break;
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection('right');
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                case Keys.BACKWARD:
                    this.motionHandler.setDirection(null);
                    break;
                case Keys.LEFT:
                case Keys.RIGHT:
                    this.motionHandler.setRotationDirection(null);
                    break;
            }

            event.preventDefault()
        });
    }

    public unsubscribe() {

    }
}