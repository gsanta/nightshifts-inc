import { ToolIcon } from '../../components/dialogs/inventory_dialog/tools_icons/ToolIcon';
import { ActionType } from '../ActionType';
import findIndex from 'lodash/findIndex';
import Highlight from '@material-ui/icons/Highlight';
import * as React from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import styled from 'styled-components';
const thermometer = require('../../../../assets/images/thermometer.png');

export const ThermometerIconStyled = styled.div`
    width: ${(props: {size: number}) => props.size}px;
    height: ${(props: {size: number}) => props.size}px;
    background-image: url(${thermometer});
    background-position: center;
    background-size: contain;
`;

const initialState = [
    {
        name: 'thermometer',
        isCarrying: false,
        isActive: false,
        getIcon(iconSize: number): JSX.Element {
            return (
                <ThermometerIconStyled size={iconSize}/>
            );
        }
    },
    {
        name: 'flashlight',
        isCarrying: false,
        isActive: false,
        getIcon(iconSize: number): JSX.Element {
            return (
                <Highlight style={{width: `${iconSize}px`, height: `${iconSize}px`}}/>
            );
        }
    },
    {
        name: 'camera',
        isCarrying: false,
        isActive: false,
        getIcon(iconSize: number): JSX.Element {
            return (
                <PhotoCamera style={{width: `${iconSize}px`, height: `${iconSize}px`}}/>
            );
        }
    },
];

export const toolsReducer = (state: ToolIcon[] = initialState, action: {type: string, tool: ToolIcon}): ToolIcon[] => {
    const tools = [...state];
    let index: number;
    switch (action.type) {
        case ActionType.ACTIVATE_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            return tools.map(t => t !== action.tool ? {...t, isActive: false } : {...t, isActive: true});

        case ActionType.GRAB_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            tools.splice(index, 1, {...action.tool, isCarrying: true});
            return tools;
        case ActionType.RELEASE_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            tools.splice(index, 1, {...action.tool, isCarrying: false});
            return tools;
        default:
            return state;
    }
};
