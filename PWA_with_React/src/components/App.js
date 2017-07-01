import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';
import Users from './Users';
import Notification from './Notification';

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
