

export enum GameActionType {
    ACTIVATE_TOOL = 'ACTIVATE_TOOL',
    DEACTIVATE_TOOL = 'DEACTIVATE_TOOL',
    NEXT_TICK = 'NEXT_TICK',
    ENTER_ROOM = 'ROOM_CHANGED',
    DAY_PASSED = 'DAY_PASSED',
    GAME_IS_READY = 'GAME_IS_READY',
    TURN_ON_ALL_LIGHTS = 'TURN_ON_ALL_LIGHTS',
    TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS = 'TURN_OFF_LIGHTS_FOR_NOT_ACTIVE_ROOMS',
    ENEMY_CREATED = 'ENEMY_CREATED',
    ENEMY_MOVED = 'ENEMY_MOVED',
    ENEMY_STRIKED = 'ENEMY_STRIKED',

    SHOW_ROOM_NAMES = 'SHOW_ROOM_NAMES',

    CREATE_BOUNDING_POLYGON_MESHES = 'CREATE_BOUNDING_POLYGON_MESHES'
}
