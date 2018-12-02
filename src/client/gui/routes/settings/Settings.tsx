import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { colors } from '../../styles';
import { SmallButton } from '../../form/SmallButton';
import { User } from '../../../stores/User';
import { UserQuery } from '../../../query/user/UserQuery';
import Popover from '@material-ui/core/Popover';
import * as ReactDom from 'react-dom';
import { StatusPopover } from '../../form/StatusPopover';
import { ActionType } from '../../../stores/ActionType';

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

const LoggedInWithFacebookText = styled.div`
    font-style: italic;
    opacity: 0.5;
`;

class Settings extends React.Component<GlobalProps, SettingsState> {
    private saveButtonRef: React.RefObject<any>;
    private savePasswordButtonRef: React.RefObject<any>;

    constructor(props: GlobalProps) {
        super(props);

        this.changeEmail = this.changeEmail.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onAppStoreChange = this.onAppStoreChange.bind(this);

        this.saveButtonRef = React.createRef();
        this.savePasswordButtonRef = React.createRef();

        this.state = {
            user: props.userStore.getModel(),
            newPassword: '',
            oldPassword: '',
            isSaveButtonPopoverOpen: false,
            isSavePasswordButtonPopoverOpen: false
        };
    }

    public componentDidMount() {
        this.props.appStore.onChange(this.onAppStoreChange);
    }

    public componentWillUnmount() {
        this.props.appStore.onChange(this.onAppStoreChange);
    }

    public render() {
        const user = this.state.user;
        return (
            <SettingsRoot>
                <SettingsLeftColumn>
                    <SmallButton
                        ref={this.saveButtonRef}
                        onClick={this.updateUser}>
                        Save changes
                    </SmallButton>
                    <StatusPopover
                        open={this.state.isSaveButtonPopoverOpen}
                        anchorEl={ReactDom.findDOMNode(this.saveButtonRef.current) as HTMLElement}
                        onClose={() => null}
                        >
                        Changes saved.
                    </StatusPopover>
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

                    {user.authStrategy === 'local' ? this.renderPasswordChangeForm() : this.renderLoggedInWithFacebookText()}
                </SettingsRightColumn>
            </SettingsRoot>
        );
    }

    private renderPasswordChangeForm() {
        return (
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
                    <SmallButton onClick={this.updatePassword} ref={this.savePasswordButtonRef}>Update password</SmallButton>
                    <StatusPopover
                        open={this.state.isSavePasswordButtonPopoverOpen}
                        anchorEl={ReactDom.findDOMNode(this.savePasswordButtonRef.current) as HTMLElement}
                        onClose={() => null}
                        >
                        Changes saved.
                    </StatusPopover>
                </PasswordSaveButton>
            </PasswordChangeFormGroup>
        );
    }

    private renderLoggedInWithFacebookText() {
        return (
            <FormGroup
            validationState={'success'}
            >
                <ControlLabelStyled>Password</ControlLabelStyled>
                <LoggedInWithFacebookText>Logged in with facebook</LoggedInWithFacebookText>
            </FormGroup>
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
        this.props.userActions.updatePassword({
            id: this.state.user.id,
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        });
    }

    private updateUser() {
        this.props.userActions
            .updateUser(this.state.user);

        this.setState({
            isSaveButtonPopoverOpen: false
        });
    }

    private onAppStoreChange() {
        if (this.props.appStore.getModel().dataLoadingState === 'recently_loaded') {
            if (this.props.appStore.getModel().lastActiontType === ActionType.UPDATE_PASSWORD) {
                this.setState({
                    isSavePasswordButtonPopoverOpen: true
                });
            } else {
                this.setState({
                    isSaveButtonPopoverOpen: true
                });
            }
        } else {
            this.setState({
                isSaveButtonPopoverOpen: false,
                isSavePasswordButtonPopoverOpen: false
            });
        }
    }
}

export interface SettingsState {
    user: User;
    oldPassword: string;
    newPassword: string;
    isSaveButtonPopoverOpen: boolean;
    isSavePasswordButtonPopoverOpen: boolean;
}

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <Settings {...globalProps}/>}
    </GlobalContext.Consumer>
);
