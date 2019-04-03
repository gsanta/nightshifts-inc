import styled from 'styled-components';
import * as React from 'react';

const wrapWithStyles = <P extends any>(Component: React.ComponentType<P>) => {
    const ComponentWithStyles = styled(Component)`
            color: green;
        `;

    return (props: P) => {
        return (
            <ComponentWithStyles {...props}/>
        );
    };
};

export default wrapWithStyles;
