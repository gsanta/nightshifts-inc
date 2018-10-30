import { GameEngine } from './GameEngine';

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
new GameEngine(canvas).runRenderLoop();