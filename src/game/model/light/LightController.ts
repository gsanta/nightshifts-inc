import { HemisphericLight } from 'babylonjs';
import _ = require('lodash');

type TIME_OF_DAY = {
    range: [number, number];
    lightIntensity: number;
}

export class LightController {
    private hemisphericLight: HemisphericLight;
    private elapsedMilliseconds = 0;
    private millisecondsPerDay = 10000;

    private static NIGHT_TIME: TIME_OF_DAY = {
        range: [0, 0.4],
        lightIntensity: 0
    };
    private static DAWN_TIME: TIME_OF_DAY = {
        range: [0.4, 0.45],
        lightIntensity: 0.2
    };
    private static EARLY_MORNING_TIME: TIME_OF_DAY = {
        range: [0.45, 0.5],
        lightIntensity: 0.4
    };
    private static MORNING_TIME: TIME_OF_DAY = {
        range: [0.5, 0.6],
        lightIntensity: 0.7
    };
    private static NOON_TIME: TIME_OF_DAY = {
        range: [0.6, 0.85],
        lightIntensity: 1
    };
    private static AFTERNOON_TIME: TIME_OF_DAY = {
        range: [0.85, 0.95],
        lightIntensity: 0.7
    };
    private static EVENING_TIME: TIME_OF_DAY = {
        range: [0.90, 0.95],
        lightIntensity: 0.5
    };

    private static LATE_EVENING_TIME: TIME_OF_DAY = {
        range: [0.95, 1],
        lightIntensity: 0.3
    };

    constructor(hemisphericLight: HemisphericLight) {
        this.hemisphericLight = hemisphericLight;
    }


    public timePassed(elapsedTime: number) {
        this.elapsedMilliseconds += elapsedTime;

        const timeOfDayRatio = (this.elapsedMilliseconds % this.millisecondsPerDay) / this.millisecondsPerDay;

        this.hemisphericLight.intensity = this.getLightIntensity(timeOfDayRatio);
    }

    private getLightIntensity(dayRatio: number) {
        return 1;

        if (_.inRange(dayRatio, ...LightController.NIGHT_TIME.range)) {
            return LightController.NIGHT_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.DAWN_TIME.range)) {
            return LightController.DAWN_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.EARLY_MORNING_TIME.range)) {
            return LightController.EARLY_MORNING_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.MORNING_TIME.range)) {
            return LightController.MORNING_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.NOON_TIME.range)) {
            return LightController.NOON_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.AFTERNOON_TIME.range)) {
            return LightController.AFTERNOON_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.EVENING_TIME.range)) {
            return LightController.EVENING_TIME.lightIntensity;
        } else if (_.inRange(dayRatio, ...LightController.LATE_EVENING_TIME.range)) {
            return LightController.LATE_EVENING_TIME.lightIntensity;
        } else {
            throw new Error('Day ratio has to be between 0 and 1, but it was: ' + dayRatio);
        }
    }
}
