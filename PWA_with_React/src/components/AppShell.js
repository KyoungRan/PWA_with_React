import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { AppBar, Drawer, MenuItem } from 'material-ui';

class SidebarDrawer extends Component {
    componentDidMount() {
        let frameCount = 0;
        const mount = () =>
            frameCount++ > 0
                ? this.props.onMounted()
                : requestAnimationFrame(mount);

        requestAnimationFrame(mount);
    }

    render() {
        return (
            <Drawer
                open={this.props.open}
                docked={false}
                onRequestChange={this.props.onRequestChange}
            >
                <MenuItem
                    primaryText={'Home'}
                    containerElement={<Link to={'/'} />}
                    onClick={this.props.onClick}
                />
                <MenuItem
                    primaryText={'Users'}
                    containerElement={<Link to={'/users'} />}
                    onClick={this.props.onClick}
                />
                <MenuItem
                    primaryText={'Notification'}
                    containerElement={<Link to={'/notification'} />}
                    onClick={this.props.onClick}
                />
            </Drawer>
        );
    }
}

class AppShell extends Component {
    state = { open: false, drawer: false };

    handleDrawerToggle = e => {
        if (this.state.drawer) {
            this.setState({ open: !this.state.open });
        } else {
            this.setState({ drawer: true });
            e.preventDefault();
        }
    };

    handleRequestChange = open => {
        open => this.setState({ open: open });
    };

    handleLinkClick = () => this.setState({ open: false });

    render() {
        const LazySidebarDrawer =
            this.state.drawer &&
            <SidebarDrawer
                open={this.state.open}
                onMounted={() => this.setState({ open: true })}
                onClick={() => this.setState({ open: false })}
                onRequestChange={open => this.setState({ open: open })}
            />;

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleDrawerToggle}
                    />
                    {LazySidebarDrawer}
                    <div
                        id="content"
                        style={{
                            width: '90%',
                            margin: 'auto',
                            marginTop: '30px'
                        }}
                    >
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default AppShell;
