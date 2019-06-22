import React from 'react'
import { Router, Scene, Drawer } from 'react-native-router-flux'
import { common } from '../../util/common'
import DrawerMenu from '../DrawerMenu/DrawerMenu'
import Login from '../../containers/Login/Login'
import Dashboard from '../../containers/Dashboard/Dashboard'
import Collect from '../../containers/Collect/Collect'
import CollectList from '../../containers/Collect/CollectList'
import CollectPoint from '../../containers/Collect/CollectPoint'
import CollectForm from '../../containers/Collect/CollectForm'
import GeoLocation from '../../containers/GeoLocation/GeoLocation'

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
                    <Scene key='collect' component={Collect} />
                    <Scene key='collectList' component={CollectList} />
                    <Scene key='collectPoint' component={CollectPoint} />
                    <Scene key='collectForm' component={CollectForm} />
                    <Scene key='geolocation' component={GeoLocation} />
                </Scene>
            </Drawer>
        </Scene>
    </Router>
)