/**
 * @flow
 * @format
 */

import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Actions } from 'react-native-router-flux'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geojson from 'react-native-geojson'
import { FloatingAction } from 'react-native-floating-action'

import common from '../../util/common'
import { routeFix } from '../../util/helpers'

import type { State } from '../../types/Dashboard'

import { Alert } from '../../components/UI'

import LimitesJuridicos from '../../assets/LimitesJuridicos.json'

class Dashboard extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      marginBottom: 1,
      error: ''
    }
  }

  componentDidMount(): void {
    this.setPosition()
  }

  onMapReady = (): void => this.setState({ marginBottom: 0 })

  setPosition = (): void => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: ''
        })
      },
      (error) => this.setState({ error: error.message })
    )
  }

  render() {
    const {
      latitude, longitude, marginBottom, error
    } = this.state

    return (
      <View style={styles.container}>
        {error !== ''
          && (
            <Alert
              color={common.colors.red}
              msg={error}
              onPress={() => Actions.refresh({ key: Math.random() })}
            />
          )}

        <MapView
          mapType="hybrid"
          onMapReady={this.onMapReady}
          style={{ ...styles.map, marginBottom }}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor={common.colors.green}
          loadingEnabled
          showsUserLocation
          showsMyLocationButton
          followsUserLocation
          onMarkerDragEnd={(event) => {
            this.setState({
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude
            })
          }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0031
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude,
              longitude
            }}
            tracksViewChange={false}
          />
          <Geojson
            geojson={LimitesJuridicos}
            strokeWidth={1.5}
            strokeColor={common.colors.red}
          />
        </MapView>

        {
          latitude !== 0 && (
            <FloatingAction
              actions={fabActions}
              color={common.colors.green}
              onPressItem={(name) => routeFix(name, this.state)}
            />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  icon: {
    textAlign: 'center'
  }
})

const fabActions = [
  {
    text: 'Coletar Ponto',
    name: 'collectForm',
    icon: (
      <Icon
        name="map-pin"
        size={22}
        color={common.colors.white}
        style={styles.icon}
      />
    ),
    color: common.colors.green,
    position: 1
  },
  {
    text: 'Listar Coletas',
    name: 'collectList',
    icon: (
      <Icon
        name="list"
        size={22}
        color={common.colors.white}
        style={styles.icon}
      />
    ),
    color: common.colors.green,
    position: 2
  }
]

export default Dashboard
