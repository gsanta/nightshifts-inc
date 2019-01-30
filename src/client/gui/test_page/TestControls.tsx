import * as React from 'react';
import { GameEngine } from '../../../game/GameEngine';
import { JsonWorldSerializer } from '../../../game/io/json_world_io/export/JsonWorldSerializer';
import { JsonDefaultItemSerializer } from '../../../game/io/json_world_io/export/serializers/JsonDefaultItemSerializer';

export const TestControls = (props: { gameEngine: GameEngine }) => {

    const serialize = () => {
        const serializer = new JsonWorldSerializer(new JsonDefaultItemSerializer());
        const json = serializer.serialize(props.gameEngine.getWorld());
        console.log(json);
    };

    return (
        <React.Fragment>
            <button onClick={serialize}>Serialize</button>
        </React.Fragment>
    );
};
