import { ToolIcon } from '../../components/dialogs/inventory/tools_icons/ToolIcon';
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
    background-size: ${(props: {size: number}) => props.size - 6}px;
    background-repeat: no-repeat;
`;

const initialState = [
    {
        name: 'thermometer',
        isCarrying: false,
        isActive: false,
        storageIndex: null,
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
        storageIndex: null,
        getIcon(iconSize: number): JSX.Element {
            return (
                <Highlight style={{width: `${iconSize - 6}px`, height: `${iconSize - 6}px`, padding: '3px'}}/>
            );
        }
    },
    {
        name: 'camera',
        isCarrying: false,
        isActive: false,
        storageIndex: null,
        getIcon(iconSize: number): JSX.Element {
            return (
                <PhotoCamera style={{width: `${iconSize - 6}px`, height: `${iconSize - 6}px`, padding: '3px'}}/>
            );
        }
    }
];

export const toolsReducer = (state: ToolIcon[] = initialState, action: {type: string, tool: ToolIcon, storageIndex?: number}): ToolIcon[] => {
    const tools = [...state];
    let index: number;
    switch (action.type) {
        case ActionType.ACTIVATE_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            return tools.map(t => t !== action.tool ? {...t, isActive: false } : {...t, isActive: true});

        case ActionType.DEACTIVATE_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            return tools.map(t => t !== action.tool ? t : {...t, isActive: false});

        case ActionType.GRAB_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            tools.splice(index, 1, {...action.tool, isCarrying: true, storageIndex: action.storageIndex});
            return tools;
        case ActionType.RELEASE_TOOL:
            index = findIndex(tools, tool => tool.name === action.tool.name);

            tools.splice(index, 1, {...action.tool, isCarrying: false, storageIndex: null});
            return tools;
        default:
            return state;
    }
};
