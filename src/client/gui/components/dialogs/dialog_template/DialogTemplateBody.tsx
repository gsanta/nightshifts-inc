import styled from 'styled-components';
import * as React from 'react';

const DialogTemplateBody = styled(({children, className}: {children: JSX.Element, className?: string}) => {
    return <div className={className}>{children}</div>;
})`
    flex: 1;
`;

export default DialogTemplateBody;
