import styled from 'styled-components';
import * as React from 'react';
import { ToolIcon } from '../../dialogs/inventory_dialog/tools_icons/ToolIcon';

const TOOL_WIDGET_SIZE = 30;

const ToolWidgetStyled = styled.div`
    cursor: pointer;
    background: ${(props: ToolWidgetProps) => props.tool.isActive ? 'red' : 'white'};
    /* padding: 5px 10px; */
`;

export const ToolWidget = (props: ToolWidgetProps) => {
    const handleClick = () => props.activateTool(props.tool);

    return (
        <ToolWidgetStyled {...props} onClick={handleClick}>
            {props.tool.getIcon(TOOL_WIDGET_SIZE)}
        </ToolWidgetStyled>
    );
};

export interface ToolWidgetProps {
    tool: ToolIcon;
    activateTool(tool: ToolIcon): void;
}
