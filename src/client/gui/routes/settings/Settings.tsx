import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';


const SettingsRoot = styled.div`
    width: 100%;
    height: 36px;
`;

export class Settings extends React.Component<{}, {}> {
    public render() {
        return (
            <SettingsRoot>

            </SettingsRoot>
        );
    }
}

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Settings {...globalProps}/>}
    </GlobalContext.Consumer>
);
