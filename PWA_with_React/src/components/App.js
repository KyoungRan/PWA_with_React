import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import asyncComponent from './AsyncComponent';
// import Home from './Home';
// import Users from './Users';
// import Notification from './Notification';

const Home = asyncComponent(() => {
    return import(/* webpackChunkName: "home" */ './Home').then(
        module => module.default || module
    );
});

const Users = asyncComponent(() => {
    return import(/* webpackChunkName: "users" */ './Users').then(
        module => module.default || module
    );
});

const Notification = asyncComponent(() => {
    return import(/* webpackChunkName: "notification" */ './Notification').then(
        module => module.default || module
    );
});

class App extends Component {
    render() {
        return (
            <Router>
                <AppShell>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/users" component={Users} />
                        <Route path="/notification" component={Notification} />
                    </div>
                </AppShell>
            </Router>
        );
    }
}

export default App;
