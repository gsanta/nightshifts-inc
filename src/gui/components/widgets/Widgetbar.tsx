import styled from 'styled-components';
import * as React from 'react';
import { ToolWidget } from './tool_widget/ToolWidget';
import { ControllerFacade } from '../../controller/ControllerFacade';
import { ControllerContext } from '../panels/Context';

const WidgetbarStyled = styled.div`
    position: absolute;
    right: 5px;
    top: 45px;
    padding: 5px 10px;
    display: flex;
    background: white;

    &:empty {
        display: none;
    }
`;

export const Widgetbar = () => {
    return (
        <ControllerContext.Consumer>
        {
            (controllers: ControllerFacade) => {

                const widgets = controllers.toolController.tools
                    .filter(tool => tool.isCarrying)
                    .map(tool => <ToolWidget
                            onClick={t => t.isActive ? controllers.toolController.deactivateTool(t) : controllers.toolController.activateTool(t)}
                            tool={tool}
                        />
                    );

                return <WidgetbarStyled>{widgets}</WidgetbarStyled>
            }
        }
        </ControllerContext.Consumer>
    );
};
