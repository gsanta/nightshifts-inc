import { GameEngine } from './GameEngine';
const gameWorldMap = require('./gwm_world_serializer/new_world_map.gwm');

const canvas = <HTMLCanvasElement> document.getElementById('render-canvas');
new GameEngine(canvas).runGame(gameWorldMap);
