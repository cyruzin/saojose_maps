import React from 'react'
import { Router, Scene, Drawer } from 'react-native-router-flux'
import { common } from '../../util/common'
import DrawerMenu from '../DrawerMenu/DrawerMenu'
import Login from '../../containers/Login/Login'
import Dashboard from '../../containers/Dashboard/Dashboard'
import Coleta from '../../containers/Coleta/Coleta'

export default () => (
    <Router navigationBarStyle={{ backgroundColor: common.colors.dark }}>
        <Scene key='root'>
            <Scene key='login' component={Login} initial hideNavBar />

            <Drawer
                key='drawerMenu'
                renderTitle='São José Mapas'
                contentComponent={DrawerMenu}
                drawerWidth={250}
                tintColor={common.colors.white}
                hideNavBar>
                <Scene key='home'>
                    <Scene key='dashboard' component={Dashboard} />
                    <Scene key='coleta' component={Coleta} />
                </Scene>
            </Drawer>
        </Scene>
    </Router>
)