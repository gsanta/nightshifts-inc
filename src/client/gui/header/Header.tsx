import styled from 'styled-components';
import * as React from 'react';
import { colors } from '../styles';

const HeaderDiv = styled.div`
    width: 100%;
    height: 30px;
    background: ${colors.Brown};
`;

export const Header = () => {
    return (
        <HeaderDiv></HeaderDiv>
    );
};
