import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { colors } from '../../styles';
import { SmallButton } from '../../form/SmallButton';
import { UserModel } from '../../../stores/UserModel';

const SettingsRoot = styled.div`
    width: 100%;
    margin-left: 240px;
    display: flex;
`;

const FormControlStyled = styled(FormControl)`
    height: 25px;
    border-radius: 0;
    width: 300px;
    margin-bottom: 2px;
    color: black;
    background-color: ${colors.LightBlue};
    border: 1px solid ${colors.LightBlue};

    &:focus {
        box-shadow: none;
        color: black;
        background-color: ${colors.LightBlue};
        border: 1px solid ${colors.Blue};
    }
`;

const ControlLabelStyled = styled(ControlLabel)`
    font-size: 12px;
    margin-bottom: 0;
`;

const SettingsLeftColumn = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const SettingsRightColumn = styled.div`
    width: 500px;
    margin: 20px 0;
    padding-left: 20px;
    border-left: 1px solid ${colors.Blue};
`;

const PasswordChangeFormGroup = styled.div`
    display: flex;
    align-items: center;
`;

const PasswordSaveButton = styled.div`
    margin-left: 30px;
`;

class Settings extends React.Component<GlobalProps, SettingsState> {

    constructor(props: GlobalProps) {
        super(props);

        this.changeEmail = this.changeEmail.bind(this);

        this.state = {
            user: props.userStore.getModel()
        };
    }

    public render() {
        return (
            <SettingsRoot>
                <SettingsLeftColumn>
                    <SmallButton onClick={() => null}>Save changes</SmallButton>
                </SettingsLeftColumn>
                <SettingsRightColumn>
                    <FormGroup
                        validationState={'success'}
                    >
                        <ControlLabelStyled>Email</ControlLabelStyled>
                        <FormControlStyled
                            type="text"
                            value={this.state.user.getEmail()}
                            placeholder="Enter text"
                            onChange={(event: any) => this.changeEmail(event.target.value)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <PasswordChangeFormGroup>
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
                        <PasswordSaveButton>
                            <SmallButton onClick={() => null}>Update password</SmallButton>
                        </PasswordSaveButton>
                    </PasswordChangeFormGroup>
                </SettingsRightColumn>
            </SettingsRoot>
        );
    }

    private changeEmail(newEmail: string) {
        const clone = this.state.user.clone();
        clone.setEmail(newEmail);
        this.setState({
            user: clone
        });
    }
}

export interface SettingsState {
    user: UserModel;
}

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Settings {...globalProps}/>}
    </GlobalContext.Consumer>
);
