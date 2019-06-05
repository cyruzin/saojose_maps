import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from '../../containers/Login/Login'
import Dashboard from '../../containers/Dashboard/Dashboard'

export default () => (
    <Router>
        <Scene key='root'>
            <Scene key='login' component={Login} initial hideNavBar />
            <Scene key='dashboard' type='reset' component={Dashboard} hideNavBar />
        </Scene>
    </Router>
)