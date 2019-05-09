import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../miscellaneous/colors';
import * as React from 'react';
import { DebugOptions } from './DebugOptions';
import styled from 'styled-components';

const SettingsRow = styled.div`
    display: flex;
`;

const DebugDialog = (props: DebugDialogProps) => {
    const handleTurnOnAllLights = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            props.setAreAllLightsTurnedOn((event.target as any).checked);
        },
        [],
    );

    const handleShowRoomLabels = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            props.setShowRoomLabels((event.target as any).checked);
        },
        [],
    );

    const handleShowBoundingBoxes = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            props.setShowBoundingBoxes((event.target as any).checked);
        },
        [],
    );

    return (
        <div>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugOptions.areAllLightsTurnedOn}
                    onChange={handleTurnOnAllLights}
                />
                Turn on all lights
            </SettingsRow>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugOptions.showRoomLabels}
                    onChange={handleShowRoomLabels}
                />
                Display ceiling
            </SettingsRow>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugOptions.showBoundingBoxes}
                    onChange={handleShowBoundingBoxes}
                />
                Display bounding boxes
            </SettingsRow>
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
    setShowRoomLabels(showRoomLabels: boolean): void;
    setShowBoundingBoxes(showBoundingBoxes: boolean): void;
}
