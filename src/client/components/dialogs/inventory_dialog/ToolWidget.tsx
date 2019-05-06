import { Tool } from '../../../../game/tools/Tool';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import * as React from 'react';

export const TOOL_WIDGET_SIZE = 50;

export interface ToolWidgetProps {
    draggable?: boolean;
    tool: Tool;
    close?(): void;
}

const ToolWidgetBackground = styled.div`
    position: relative;
    background: repeating-linear-gradient(
        45deg,
        #E2F1FF,
        #E2F1FF 5px,
        #B1D9FE 5px,
        #B1D9FE 10px
    );
    width: ${TOOL_WIDGET_SIZE}px;
    height: ${TOOL_WIDGET_SIZE}px;
    margin: 5px;
    cursor: ${(props: {draggable: boolean}) => props.draggable ? 'pointer' : 'drag'};
`;

const ToolWidgetCloseButton = styled<any>(Close)`
    position: absolute;
    right: 0;
    top: 0;
    && {
        width: 50px;
        height: 50px;
    }
    color: red;
    cursor: pointer;
`;

export const ToolWidget: React.SFC<ToolWidgetProps> = (props: ToolWidgetProps) => {
    const closeButton = props.close ? <ToolWidgetCloseButton onClick={props.close}/> : null;
    return (
        <ToolWidgetBackground draggable={props.draggable} onDragStart={(e) => e.dataTransfer.setData('id', props.tool.getName())}>
            {closeButton}
            {props.tool.getIcon(TOOL_WIDGET_SIZE)}
        </ToolWidgetBackground>
    );
};

ToolWidget.defaultProps = {
    draggable: false
};

