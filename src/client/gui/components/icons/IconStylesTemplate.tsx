import styled from 'styled-components';
import * as React from 'react';

const wrapWithStyles = <P extends any>(Component: React.ComponentType<P>) => {
    const ComponentWithStyles = styled(Component)`
            &:not(:last-child) {
                margin-right: 10px;
            }

            cursor: pointer;
            color: black;
        `;

    return (props: P) => {
        return (
            <ComponentWithStyles {...props}/>
        );
    };
};

export default wrapWithStyles;
