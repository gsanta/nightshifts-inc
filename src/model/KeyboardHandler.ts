import { ManualMotionStrategy } from './creature/motion/ManualMotionStrategy';
import { EventEmitter } from 'events';

export enum Keys {
     FORWARD = 38,
     BACKWARD = 40,
     LEFT = 37,
     RIGHT = 39
}

export type MoveDirection = 'FORWARD' | 'BACKWARD';
export type RotationDirection = 'LEFT' | 'RIGHT';

export class KeyboardHandler extends EventEmitter {
    public subscribe() {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                    this.emitMove('FORWARD');
                    // this.motionHandler.setDirection('forward')
                    break;
                case Keys.BACKWARD:
                    this.emitMove('BACKWARD');
                    // this.motionHandler.setDirection('backward')
                    break;
                case Keys.LEFT:
                    this.emitTurn('LEFT');
                    // this.motionHandler.setRotationDirection('left');
                    break;
                case Keys.RIGHT:
                    this.emitTurn('RIGHT');
                    // this.motionHandler.setRotationDirection('right');
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case Keys.FORWARD:
                case Keys.BACKWARD:
                    this.emitMoveEnd();
                    // this.motionHandler.setDirection(null);
                    break;
                case Keys.LEFT:
                case Keys.RIGHT:
                    this.emitTurnEnd();
                    // this.motionHandler.setRotationDirection(null);
                    break;
            }

            event.preventDefault()
        });
    }

    public onMove(eventHandler: (direction: 'FORWARD' | 'BACKWARD') => void) {
        this.on('move', eventHandler);
    }

    public offMove(eventHandler: (direction: 'FORWARD' | 'BACKWARD') => void) {
        this.removeListener('move', eventHandler);
    }

    private emitMove(direction: 'FORWARD' | 'BACKWARD') {
        this.emit('move', direction);
    }

    public onMoveEnd(eventHandler: () => void) {
        this.on('moveEnd', eventHandler);
    }

    public offMoveEnd(eventHandler: () => void) {
        this.removeListener('moveEnd', eventHandler);
    }

    private emitMoveEnd() {
        this.emit('moveEnd');
    }

    public onTurn(eventHandler: (direction: 'LEFT' | 'RIGHT') => void) {
        this.on('turn', eventHandler);
    }

    public offTurn(eventHandler: (direction: 'LEFT' | 'RIGHT') => void) {
        this.removeListener('turn', eventHandler);
    }

    private emitTurn(direction: 'LEFT' | 'RIGHT') {
        this.emit('turn', direction);
    }

    public onTurnEnd(eventHandler: () => void) {
        this.on('turnEnd', eventHandler);
    }

    public offTurnEnd(eventHandler: () => void) {
        this.removeListener('turnEnd', eventHandler);
    }

    private emitTurnEnd() {
        this.emit('turnEnd');
    }

    public unsubscribe() {

    }
}