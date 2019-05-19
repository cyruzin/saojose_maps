import React from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import Login from '../../containers/Login/Login'

export default () => (
    <Router>
        <Stack key='root'>
            <Scene key='login' component={Login} initial />
        </Stack>
    </Router>
)