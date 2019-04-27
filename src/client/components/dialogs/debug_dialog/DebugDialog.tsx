import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../miscellaneous/colors';
import * as React from 'react';
import { DebugOptions } from './DebugOptions';

const DebugDialog = (props: DebugDialogProps) => {
    const handleTurnOnAllLights = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            props.setAreAllLightsTurnedOn((event.target as any).checked);
        },
        [],
    );

    return (
        <div>
            <input
                type="checkbox"
                checked={props.debugOptions.areAllLightsTurnedOn}
                onChange={handleTurnOnAllLights}
            />
            Turn on all lights
        </div>
    );
};



export default withDialog(DebugDialog, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});

export interface DebugDialogProps extends DialogTemplateProps {
    debugOptions: DebugOptions;
    setAreAllLightsTurnedOn(areTurnedOn: boolean): void;
}
