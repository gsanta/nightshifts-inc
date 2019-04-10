import styled from 'styled-components';
import * as React from 'react';
import colors from '../../../colors';

const TitleLineStyle = styled.div`
    text-align: center;
    margin: 40px 0px;
`;

const TitleLineHorizontalLine = styled.hr`
    border-top: 1px solid ${colors.MainTextGray};
    margin-top: -12px;
`;

const TitleLineText = styled.div`
    display: inline-block;
    background: white;
    color: ${colors.MainTextGray};
    font-style: italic;
    padding: 0 2px;
`;

export const TitleLine = ({children}: {children: JSX.Element | string}) => {
    return (
        <TitleLineStyle>
            <TitleLineText>{children}</TitleLineText>
            <TitleLineHorizontalLine/>
        </TitleLineStyle>
    );
};
