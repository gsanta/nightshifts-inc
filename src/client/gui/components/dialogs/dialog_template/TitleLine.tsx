import styled from 'styled-components';
import * as React from 'react';
import colors from '../../../colors';

const TitleLineStyle = styled.div`
    text-align: center;
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

export const TitleLine: React.SFC<TitleLineProps> = (props: TitleLineProps) => {
    return (
        <TitleLineStyle style={{
            marginTop: `${props.marginTop}px`,
            marginBottom: `${props.marginBottom}px`,
        }}>
            <TitleLineText>{props.children}</TitleLineText>
            <TitleLineHorizontalLine/>
        </TitleLineStyle>
    );
};

TitleLine.defaultProps = {
    marginTop: 40,
    marginBottom: 40
};

export interface TitleLineProps {
    children: JSX.Element | string;
    marginTop?: number;
    marginBottom?: number;
}
