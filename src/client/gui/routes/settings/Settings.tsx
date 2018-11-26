import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { colors } from '../../styles';
import { SmallButton } from '../../form/SmallButton';
import { User } from '../../../stores/User';
import { UserQuery } from '../../../query/user/UserQuery';

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
        this.saveChanges = this.saveChanges.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.state = {
            user: props.userStore.getModel(),
            newPassword: '',
            oldPassword: ''
        };
    }

    public render() {
        return (
            <SettingsRoot>
                <SettingsLeftColumn>
                    <SmallButton onClick={this.saveChanges}>Save changes</SmallButton>
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
                                type="password"
                                value={this.state.oldPassword}
                                placeholder=""
                                onChange={(e: React.ChangeEvent<any>) => this.setState({oldPassword: e.target.value})}
                            />
                            <ControlLabelStyled>New password</ControlLabelStyled>
                            <FormControlStyled
                                type="password"
                                value={this.state.newPassword}
                                placeholder=""
                                onChange={(e: React.ChangeEvent<any>) => this.setState({newPassword: e.target.value})}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <PasswordSaveButton>
                            <SmallButton onClick={this.updatePassword}>Update password</SmallButton>
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

    private updatePassword() {
        const userQuery = new UserQuery();

        userQuery.updatePassword({
            id: this.state.user.id,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        });
    }

    private saveChanges() {
        this.props.userActions.updateUser(this.state.user);
    }
}

export interface SettingsState {
    user: User;
    oldPassword: string;
    newPassword: string;
}

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Settings {...globalProps}/>}
    </GlobalContext.Consumer>
);
