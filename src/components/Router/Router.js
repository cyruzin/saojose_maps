import React from 'react'

import { Router, Scene, Drawer } from 'react-native-router-flux'

import common from '../../util/common'
import { onBackPress, loadState, checkTokenExpiration } from '../../util/helpers'

import DrawerMenu from '../DrawerMenu/DrawerMenu'
import Login from '../../containers/Login/Login'
import Dashboard from '../../containers/Dashboard/Dashboard'
import CollectList from '../../containers/Collect/CollectList'
import CollectForm from '../../containers/Collect/CollectForm'
import CollectImage from '../../containers/Collect/CollectImage'

export default () => (
  <Router
    navigationBarStyle={{ backgroundColor: common.colors.dark }}
    backAndroidHandler={onBackPress}
  >
    <Scene key="root">
      <Scene
        key="login"
        component={Login}
        onEnter={loadState}
        hideNavBar
        initial
      />
      <Drawer
        key="drawerMenu"
        onEnter={checkTokenExpiration}
        renderTitle="São José Mapas"
        contentComponent={DrawerMenu}
        drawerWidth={250}
        tintColor={common.colors.white}
        hideNavBar
      >
        <Scene key="home">
          <Scene key="dashboard" component={Dashboard} />
          <Scene key="collectList" component={CollectList} />
          <Scene key="collectForm" component={CollectForm} />
          <Scene key="collectImage" component={CollectImage} />
        </Scene>
      </Drawer>
    </Scene>
  </Router>
)
