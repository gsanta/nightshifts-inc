import styled from 'styled-components';
import * as React from 'react';
import { colors } from '../styles';
import { User } from '../../state/user/User';
import { withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { AppState } from '../../state/root/RootState';

const HeaderDiv = styled.div`
    width: 100%;
    height: 36px;
    background: ${colors.Gray2};
`;

const ProfileSection = styled.div`
    padding: 5px 10px;
`;

const StyledMenuIcon = styled(MenuIcon)`
    color: white;
    width: 30px;
    cursor: pointer;
`;

const styles = theme => ({
    menuButton: {
        // d.ts did not recognize textTransform so casting to any
        textTransform: 'none',
        color: colors.White
    } as any
});

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleOpenSettings = this.handleOpenSettings.bind(this);

        this.state = {
            anchorElement: null
        };
    }

    public render() {
        const user = this.props.user;

        const getProfileSection = () => {
            return (
                <ProfileSection>
                    <StyledMenuIcon onClick={this.props.openSidebar}/>

                        {/* <Button
                            className={this.props.classes.menuButton}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            {user.getEmail()}
                        </Button>
                        <Menu
                            anchorEl={this.state.anchorElement}
                            open={!!this.state.anchorElement}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleOpenSettings}>Settings</MenuItem>
                            <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
                        </Menu> */}
                </ProfileSection>
            );
        };

        return (
            <HeaderDiv>
                {user ? getProfileSection() : null}
            </HeaderDiv>
        );
    }

    private handleClick(event: React.SyntheticEvent<HTMLElement>) {
        this.setState({ anchorElement: event.currentTarget });
      }

    private handleClose() {
        this.setState({ anchorElement: null });
    }

    private handleOpenSettings() {
        this.props.history.push({
            pathname: '/settings'
        });
        this.setState({ anchorElement: null });
    }

    private handleSignOut() {
        // this.props.userActions.signOut();
        this.setState({ anchorElement: null });
    }
}

const StyledHeader = withStyles(styles)(Header);

// export default (props: any) => (
//     <GlobalContext.Consumer>
//         {(globalProps: GlobalProps) => <StyledHeader {...globalProps} {...props}/>}
//     </GlobalContext.Consumer>
// );

export default connect(mapStateToProps, mapDispatchToProps)(StyledHeader);

export interface HeaderState {
    anchorElement: HTMLElement | null;
}

export interface HeaderProps {
    classes: any;
    history: any;
    openSidebar(): void;
    user: User;
}
