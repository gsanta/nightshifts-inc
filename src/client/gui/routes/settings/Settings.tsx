import * as React from 'react';
import styled from 'styled-components';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { SmallButton } from '../../form/SmallButton';
import { User } from '../../../state/user/User';
import * as ReactDom from 'react-dom';
import { StatusPopover } from '../../form/StatusPopover';
import { SettingsInputField } from '../../form/SettingsInputField';
import { hasError, getErrorMessage } from '../../dialogs/FormDialogWrapper';
import { DataLoadingState, AppState } from '../../../state/root/RootState';
import { connect } from 'react-redux';
import { ErrorMessage } from '../../ErrorMessage';
import UpdateUserActions from '../../../state/user/actions/UpdateUserActions';
import UpdatePasswordActions from '../../../state/user/actions/UpdatePasswordActions';
import TextField from '../../components/form_elements/text_field/TextField';
import Button from '../../components/form_elements/Button';

const SettingsRoot = styled.div`
    width: 100%;
    padding: 10px;
`;

const ControlLabelStyled = styled(ControlLabel)`
    font-size: 12px;
    margin-bottom: 0;
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
        updatePassword: (user: User, newPassword: string, oldPassword: string ) =>
            dispatch(UpdatePasswordActions.request({user, newPassword, oldPassword})),
        updateUser: (user: User) => dispatch(UpdateUserActions.request(user))
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
            didUserPropsArrive: props.user ? true : false,
            user: props.user,
            newPassword: '',
            oldPassword: '',
            isSaveButtonPopoverOpen: false,
            isSavePasswordButtonPopoverOpen: false
        };
    }

    public static getDerivedStateFromProps(props: SettingsProps, state: SettingsState) {
        if (props.user && !state.didUserPropsArrive) {
            return {
                ...state,
                user: props.user.clone(),
                didUserPropsArrive: true
            };
        }
    }

    public render() {
        const email = this.state.user ? this.state.user.email : null;
        const authStrategy = this.state.user ? this.state.user.authStrategy : null;

        return (
            <SettingsRoot>
                <div>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={newEmail => this.changeEmail(newEmail)}
                        disabled={authStrategy === 'facebook'}
                        hasError={false}
                        errorMessage={getErrorMessage(this.props.errors, 'email')}
                    />
                </div>

                <div>
                    {authStrategy === 'facebook' ? this.renderLoggedInWithFacebookText() : this.renderPasswordChangeForm()}
                </div>

                <div>
                    <Button label="Done"/>

                    <SmallButton
                            ref={this.saveButtonRef}
                            onClick={() => this.props.updateUser(this.state.user)}
                            isDisabled={this.props.dataLoadingState === 'loading'}
                        >
                        Save changes
                    </SmallButton>
                </div>
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
    }

    private updateUser() {
        this.setState({
            isSaveButtonPopoverOpen: false
        });
    }

    private onAppStoreChange() {
        if (this.props.dataLoadingState === 'recently_loaded') {
                this.setState({
                    isSaveButtonPopoverOpen: true
                });
        } else {
            this.setState({
                isSaveButtonPopoverOpen: false,
                isSavePasswordButtonPopoverOpen: false
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

export interface SettingsState {
    user: User;
    oldPassword: string;
    newPassword: string;
    isSaveButtonPopoverOpen: boolean;
    isSavePasswordButtonPopoverOpen: boolean;
    didUserPropsArrive: boolean;
}

export interface SettingsProps {
    user: User;
    dataLoadingState: DataLoadingState;
    errors: ErrorMessage[];
    updatePassword(newPassword: string, oldPassword: string);
    updateUser(user: User);
}
