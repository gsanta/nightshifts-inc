import {expect} from 'chai';
import { EyeSensor } from './EyeSensor';

describe('EyeSensor', () => {

    describe('isAngleBetweenFieldOfView', () => {
        describe('for cases when FOV does not extend beyond [-PI, PI]', () => {
            it ('returns true if angle is inside FOV', () => {
                const center = 2;
                const fow = 1;
                const angle = 2.3;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.true;
            });

            it ('returns false if angle is below FOV', () => {
                const center = 2;
                const fow = 1;
                const angle = 1.4;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });

            it ('returns false if angle is above FOV', () => {
                const center = 2;
                const fow = 1;
                const angle = 2.6;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });
        });

        describe('for cases when FOV exceeds PI in positive direction', () => {
            it ('returns true if angle is inside FOV (angle exceeds PI)', () => {
                const center = 3;
                const fow = 1;
                const angle = -3;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.true;
            });

            it ('returns true if angle is inside FOV (angle does not exceed PI)', () => {
                const center = 3;
                const fow = 1;
                const angle = 2.8;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.true;
            });

            it ('returns false if angle is below FOV', () => {
                const center = 3;
                const fow = 1;
                const angle = 2.4;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });

            it ('returns false if angle is above FOV', () => {
                const center = 3;
                const fow = 1;
                const angle = -2.5;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });
        });

        describe('for cases when FOV exceeds -PI in negative direction', () => {
            it ('returns true if angle is inside FOV (angle exceeds -PI in negative direction)', () => {
                const center = -3;
                const fow = 1;
                const angle = 3;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.true;
            });

            it ('returns true if angle is inside FOV (angle is biggern than -PI)', () => {
                const center = -3;
                const fow = 1;
                const angle = -2.8;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.true;
            });

            it ('returns false if angle is above FOV', () => {
                const center = -3;
                const fow = 1;
                const angle = -2.5;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });

            it ('returns false if angle is below FOV', () => {
                const center = -3;
                const fow = 1;
                const angle = 2.5;

                const isBetween = EyeSensor.isAngleBetweenFieldOfView(center, fow, angle);
                expect(isBetween).to.false;
            });
        });
    });
});