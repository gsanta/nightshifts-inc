import * as React from 'react';
import { GlobalContext, GlobalProps } from '../../App';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { colors } from '../../styles';
import { SmallButton } from '../../form/SmallButton';
import { User } from '../../../stores/User';
import * as ReactDom from 'react-dom';
import { StatusPopover } from '../../form/StatusPopover';
import { ActionType } from '../../../stores/ActionType';
import { SettingsInputField } from '../../form/SettingsInputField';
import { hasError, getErrorMessage } from '../../dialogs/FormDialogWrapper';
import { toVector3 } from '../../../../game/model/core/VectorModel';
import { DataLoadingState, AppState } from '../../../state/AppState';
import { connect } from 'react-redux';
import { ErrorMessage } from '../../ErrorMessage';
import { UserQuery } from '../../../query/user/UserQuery';
import { updatePassword, updatePassworRequest } from '../../../stores/UserActions';

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

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user,
        dataLoadingState: state.dataLoadingState,
        errors: state.errors,
        userQuery: state.query.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updatePassword: (user: User, newPassword: string, oldPassword: string, userQuery: UserQuery ) =>
            dispatch(updatePassworRequest(user, newPassword, oldPassword, userQuery))
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...{
            updatePassword: (newPassword: string, oldPassword: string) =>
                dispatchProps.updatePassword(stateProps.user, newPassword, oldPassword, stateProps.userQuery)
        }
    };
};

class Settings extends React.Component<SettingsProps, SettingsState> {
    private saveButtonRef: React.RefObject<any>;
    private savePasswordButtonRef: React.RefObject<any>;

    constructor(props: SettingsProps) {
        super(props);

        this.changeEmail = this.changeEmail.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onAppStoreChange = this.onAppStoreChange.bind(this);

        this.saveButtonRef = React.createRef();
        this.savePasswordButtonRef = React.createRef();

        this.state = {
            user: props.user,
            newPassword: '',
            oldPassword: '',
            isSaveButtonPopoverOpen: false,
            isSavePasswordButtonPopoverOpen: false
        };
    }

    public static getDerivedStateFromProps(props: SettingsProps, state: SettingsState) {
        return {...state, user: props.user};
    }

    public render() {
        const user = this.state.user;
        return (
            <SettingsRoot>
                <SettingsLeftColumn>
                    <SmallButton
                        ref={this.saveButtonRef}
                        onClick={this.updateUser}
                        isDisabled={this.props.dataLoadingState === 'loading'}
                    >
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
                    <SettingsInputField
                        type="text"
                        label="Email"
                        value={this.state.user.email}
                        onChange={email => this.changeEmail(email)}
                        hasError={false}
                        errorMessage={getErrorMessage(this.props.errors, 'email')}
                    />

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
                    <SettingsInputField
                        type="password"
                        label="Old password"
                        value={this.state.oldPassword}
                        onChange={(oldPassword) => this.setState({oldPassword})}
                        hasError={hasError(this.props.errors, 'oldPassword')}
                        errorMessage={getErrorMessage(this.props.errors, 'oldPassword')}
                    />
                    <SettingsInputField
                        type="password"
                        label="New password"
                        value={this.state.newPassword}
                        onChange={(newPassword) => this.setState({newPassword})}
                        hasError={false}
                        errorMessage={getErrorMessage(this.props.errors, 'newPassword')}
                    />
                </FormGroup>
                <PasswordSaveButton>
                    <SmallButton
                        onClick={this.updatePassword}
                        ref={this.savePasswordButtonRef}
                        isDisabled={this.props.dataLoadingState === 'loading'}
                    >
                        Update password
                    </SmallButton>
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
        this.props.updatePassword(this.state.newPassword, this.state.oldPassword);
        // this.props.userActions.updatePassword({
        //     id: this.props.userStore.getModel().id,
        //     oldPassword: this.state.oldPassword,
        //     newPassword: this.state.newPassword
        // });
    }

    private updateUser() {
        // this.props.userActions
        //     .updateUser(this.state.user);

        this.setState({
            isSaveButtonPopoverOpen: false
        });
    }

    private onAppStoreChange() {
        if (this.props.dataLoadingState === 'recently_loaded') {
            // if (this.props.appStore.getModel().lastActiontType === ActionType.UPDATE_PASSWORD) {
            //     this.setState({
            //         isSavePasswordButtonPopoverOpen: true
            //     });
            // } else {
            //     this.setState({
            //         isSaveButtonPopoverOpen: true
            //     });
            // }
        } else {
            this.setState({
                isSaveButtonPopoverOpen: false,
                isSavePasswordButtonPopoverOpen: false
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Settings);

export interface SettingsState {
    user: User;
    oldPassword: string;
    newPassword: string;
    isSaveButtonPopoverOpen: boolean;
    isSavePasswordButtonPopoverOpen: boolean;
}

export interface SettingsProps {
    user: User;
    dataLoadingState: DataLoadingState;
    errors: ErrorMessage[];
    updatePassword(newPassword: string, oldPassword: string);
}
