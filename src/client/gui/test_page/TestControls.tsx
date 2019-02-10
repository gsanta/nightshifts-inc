import * as React from 'react';
import { GameEngine } from '../../../game/GameEngine';
import { JsonWorldExporter } from '../../../game/io/json_world_io/export/JsonWorldExporter';
import { JsonDefaultItemExporter } from '../../../game/io/json_world_io/export/serializers/JsonDefaultItemExporter';

export const TestControls = (props: { gameEngine: GameEngine }) => {

    const serialize = () => {
        const serializer = new JsonWorldExporter(new JsonDefaultItemExporter());
        const json = serializer.export(props.gameEngine.getWorld());
        console.log(json);
    };

    return (
        <React.Fragment>
            <button onClick={serialize}>Serialize</button>
        </React.Fragment>
    );
};
