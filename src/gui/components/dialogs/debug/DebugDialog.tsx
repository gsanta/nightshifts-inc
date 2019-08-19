import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../miscellaneous/colors';
import * as React from 'react';
import { DebugOptions } from './DebugOptions';
import styled from 'styled-components';
import { GameController } from '../../../controller/GameController';
import { DebugController } from '../../../controller/DebugController';

const SettingsRow = styled.div`
    display: flex;
`;

const DebugDialog = (props: DebugDialogProps) => {
    return (
        <div>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugController.allLightsOn}
                    onChange={(e: React.ChangeEvent<any>) => props.debugController.switchlAllLights((e.target as any).checked)}
                />
                Turn on all lights
            </SettingsRow>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugController.isRoofDisplayed}
                    onChange={(e: React.ChangeEvent<any>) => props.debugController.displayRoof((e.target as any).checked)}
                />
                Display ceiling
            </SettingsRow>
            <SettingsRow>
                <input
                    type="checkbox"
                    checked={props.debugController.isBoundingBoxDisplayed}
                    onChange={(e: React.ChangeEvent<any>) => props.debugController.displayBoundingBoxes((e.target as any).checked)}
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
    debugController: DebugController;
}
