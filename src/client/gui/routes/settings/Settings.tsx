import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { colors } from '../../styles';

const SettingsRoot = styled.div`
    width: 100%;
    margin-left: 240px;
`;

const FormControlStyled = styled(FormControl)`
    height: 25px;
    border-radius: 0;
    width: 300px;
    margin-bottom: 2px;

    &:focus {
        box-shadow: none;
        border: 1px solid ${colors.Gray2}
    }
`;

const ControlLabelStyled = styled(ControlLabel)`
    font-size: 12px;
    margin-bottom: 0;
`;

const SettingsContent = styled.div`
    width: 500px;
    margin: 20px 0;
`;

export class Settings extends React.Component<{}, {}> {
    public render() {
        return (
            <SettingsRoot>
                <SettingsContent>
                    <FormGroup
                        validationState={'success'}
                    >
                        <ControlLabelStyled>Email</ControlLabelStyled>
                        <FormControlStyled
                            type="text"
                            value={'abcd'}
                            placeholder="Enter text"
                            onChange={null}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        validationState={'success'}
                    >
                        <ControlLabelStyled>Old password</ControlLabelStyled>
                        <FormControlStyled
                            type="text"
                            value={'abcd'}
                            placeholder="Enter text"
                            onChange={null}
                        />
                        <ControlLabelStyled>New password</ControlLabelStyled>
                        <FormControlStyled
                            type="text"
                            value={'abcd'}
                            placeholder="Enter text"
                            onChange={null}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </SettingsContent>
            </SettingsRoot>
        );
    }
}

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Settings {...globalProps}/>}
    </GlobalContext.Consumer>
);
