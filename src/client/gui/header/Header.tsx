import styled from 'styled-components';
import * as React from 'react';
import { colors } from '../styles';
import { UserModel } from '../../stores/UserModel';
import { Menu, MenuItem, Button, withStyles } from '@material-ui/core';
import ArrayDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { GlobalContext, GlobalProps } from '../App';

const HeaderDiv = styled.div`
    width: 100%;
    height: 36px;
    background: ${colors.Black};
`;

const ProfileSection = styled.div`
    float: right;
`;

const styles = theme => ({
    menuButton: {
        // d.ts did not recognize textTransform so casting to any
        textTransform: 'none',
        color: colors.White
    } as any
});

class Header extends React.Component<GlobalProps & HeaderProps, HeaderState> {

    constructor(props: GlobalProps & HeaderProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);

        this.state = {
            anchorElement: null
        };
    }

    public render() {
        const user = this.props.userStore.getModel();

        const getProfileSection = () => {
            return (
                <ProfileSection>
                        <Button
                            className={this.props.classes.menuButton}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            {user.getEmail()}
                            <ArrayDropDownIcon/>
                        </Button>
                        <Menu
                            anchorEl={this.state.anchorElement}
                            open={!!this.state.anchorElement}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                            <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
                        </Menu>
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

    private handleSignOut() {
        this.props.userActions.signOut();
        this.setState({ anchorElement: null });
    }
}

const StyledHeader = withStyles(styles)(Header);

export default () => (
    <GlobalContext.Consumer>
        {(globalProps: GlobalProps) => <StyledHeader {...globalProps}/>}
    </GlobalContext.Consumer>
);

export interface HeaderState {
    anchorElement: HTMLElement | null;
}

export interface HeaderProps {
    classes: any;
}
