import * as React from 'react';
import DialogTemplate from '../DialogTemplate';
import {Highlight} from '@material-ui/icons';
import styled from 'styled-components';
import { Tool } from './Tool';

const TOOL_WIDGET_SIZE = 50;

const ToolWidgetBackground = styled.div`
    background: repeating-linear-gradient(
        45deg,
        #389FFF,
        #389FFF 5px,
        #B1D9FE 5px,
        #B1D9FE 10px
    );
    width: ${TOOL_WIDGET_SIZE}px;
    height: ${TOOL_WIDGET_SIZE}px;
    margin: 5px;
`;

const ToolWidget: React.SFC<{draggable?: boolean, tool: Tool}> = (props: {draggable?: boolean, tool: Tool}) => {
    return (
        <ToolWidgetBackground draggable={props.draggable} onDragStart={(e) => e.dataTransfer.setData('id', props.tool.name)}>
            <Highlight style={{width: `${TOOL_WIDGET_SIZE}px`, height: `${TOOL_WIDGET_SIZE}px`}}/>
        </ToolWidgetBackground>
    );
};

ToolWidget.defaultProps = {
    draggable: false
};

const InventoryDialogStyle = styled.div`
    > div:first-child {
        border-bottom: 1px solid #E2F1FF;
        min-height: ${TOOL_WIDGET_SIZE + 10}px;
    }

    > div {
        width: 100%;
    }
`;

const InventoryDialog = (props: InventoryDialogProps) => {
    const onDragOver = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            e.preventDefault();
        },
        [],
    );

    const tools = props.tools.map(tool =>  <ToolWidget draggable={true} tool={tool}/>);

    return (
        <InventoryDialogStyle>
            <div onDragOver={onDragOver}>
            </div>
            <div>
                {tools}
            </div>
        </InventoryDialogStyle>
    );
};

export default DialogTemplate(InventoryDialog, {
    colors: {
        header: '#B1D9FE',
        headerBorder: '#E2F1FF',
        body: '#389FFF'
    }
});


export interface InventoryDialogProps {
    tools: Tool[];
    grabTool(tool: Tool);
}
