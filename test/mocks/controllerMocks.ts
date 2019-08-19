import { ControllerFacade } from '../../src/gui/controller/ControllerFacade';
import { GameController } from '../../src/gui/controller/GameController';
import { ServiceFacade } from '../../src/game/services/ServiceFacade';
import * as sinon from 'sinon';
import { DebugServices } from '../../src/game/services/DebugServices';
import { RenderController } from '../../src/gui/controller/RenderController';


export function mockControllers(): ControllerFacade {

    const controller = new ControllerFacade();

    return controller;
}

export interface DebugServicesMock {
    displayRoofs: sinon.SinonStub;
    hideRoofs: sinon.SinonStub;
    turnOnAllLights: sinon.SinonStub;
    turnOffAllLights: sinon.SinonStub;
    displayBoundingBoxes: sinon.SinonStub;
    hideBoundingBoxes: sinon.SinonStub;
}

export function mockDebugServices(): [DebugServices, DebugServicesMock] {
    const displayRoofs = sinon.stub();
    const hideRoofs = sinon.stub();
    const turnOnAllLights = sinon.stub();
    const turnOffAllLights = sinon.stub();
    const displayBoundingBoxes = sinon.stub();
    const hideBoundingBoxes = sinon.stub();

    return [
        <DebugServices> {
            displayRoofs: <any> displayRoofs,
            hideRoofs: <any> hideRoofs,
            turnOnAllLights: <any> turnOnAllLights,
            turnOffAllLights: <any> turnOffAllLights,
            displayBoundingBoxes: <any> displayBoundingBoxes,
            hideBoundingBoxes: <any> hideBoundingBoxes
        },
        {
            displayRoofs,
            hideRoofs,
            turnOnAllLights,
            turnOffAllLights,
            displayBoundingBoxes,
            hideBoundingBoxes
        }
    ];
}

export interface ServiceFacadeMock {
    debugServices: DebugServicesMock;
}

export function mockServiceFacade(): [ServiceFacade, ServiceFacadeMock] {
    const [debugServices, debugServicesStub] = mockDebugServices();
    return [
        <ServiceFacade> {
            debugServices: debugServices
        },
        <ServiceFacadeMock> {
            debugServices: debugServicesStub
        }
    ]
}

export interface GameControllerStubs {
    getGameServices: () => ServiceFacadeMock;
}

export function mockGameController(): [GameController, GameControllerStubs] {

    const [serviceFacade, serviceFacadeStubs] = mockServiceFacade();

    return [
        <GameController> {
            getGameServices: () => serviceFacade
        },
        <GameControllerStubs> {
            getGameServices: () => serviceFacadeStubs
        }
    ];
}

export interface RenderControllerStubs {
    render: sinon.SinonStub;
}

export function mockRenderController(): [RenderController, RenderControllerStubs] {
    const render = sinon.stub();

    return [
        <RenderController> {
            render: <any> render
        },
        <RenderControllerStubs> {
            render
        }
    ]
}

export interface ControllerFacadeStubs {
    gameController: GameControllerStubs;
    renderController: RenderControllerStubs;
}

export function mockControllerFacade(): [ControllerFacade, ControllerFacadeStubs] {
    const [gameController, gameControllerStubs] = mockGameController();
    const [renderController, renderControllerStubs] = mockRenderController();

    return [
        <ControllerFacade> {
            gameController,
            renderController
        },
        <ControllerFacadeStubs> {
            gameController: gameControllerStubs,
            renderController: renderControllerStubs
        }
    ];
}
