import styled from 'styled-components';
import * as React from 'react';

const WidgetbarStyled = styled.div`
    position: absolute;
    right: 5px;
    top: 45px;
    padding: 5px 10px;
    display: flex;
    background: white;
`;

export const Widgetbar = (props: WidgetbarProps) => {
    return (
        <WidgetbarStyled>{props.children}</WidgetbarStyled>
    );
};

export interface WidgetbarProps {
    children: JSX.Element[];
}
