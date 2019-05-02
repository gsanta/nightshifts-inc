import * as React from 'react';
import styled from 'styled-components';
import { World } from '../../../game/world/World';

const HealthWidgetContainer = styled.div`
    padding: 5px;
    background: white;
`;

export const HealthWidget = ({health}: {health: number}) => {
    return <HealthWidgetContainer>Health: {health}%</HealthWidgetContainer>;
};
