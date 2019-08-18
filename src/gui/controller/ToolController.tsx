import { ToolIcon } from '../components/dialogs/inventory/tools_icons/ToolIcon';
import * as React from 'react';
import Highlight from '@material-ui/icons/Highlight';
import { ControllerFacade } from './ControllerFacade';

const defaultTools: ToolIcon[] = [
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
        name: 'portal',
        isCarrying: false,
        isActive: false,
        storageIndex: null,
        getIcon(iconSize: number): JSX.Element {
            return (
                <Highlight style={{width: `${iconSize - 6}px`, height: `${iconSize - 6}px`, padding: '3px'}}/>
            );
        }
    }
];

export class ToolController {
    readonly tools: ToolIcon[];
    readonly controllers: ControllerFacade;

    constructor(controllers: ControllerFacade) {
        this.tools = defaultTools;
        this.controllers = controllers;
    }

    grabTool(tool: ToolIcon, storageIndex: number) {
        tool.isCarrying = true;
        tool.storageIndex = storageIndex;
        this.controllers.renderController.reRender();
    }

    releaseTool(tool: ToolIcon) {
        tool.isCarrying = false;
        tool.storageIndex = null;
        this.controllers.renderController.reRender();
    }

    activateTool(tool: ToolIcon) {
        tool.isActive = true;
        this.controllers.renderController.reRender();
    }

    deactivateTool(tool: ToolIcon) {
        tool.isActive = false;
        this.controllers.renderController.reRender();
    }
}
