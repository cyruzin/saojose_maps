/**
 * @flow
 * @format
 */

import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FloatingAction } from 'react-native-floating-action'
import Geojson from 'react-native-geojson'
import common from '../../util/common'
import { routeFix } from '../../util/helpers'
import { Alert } from '../../components/UI'
import LimitesJuridicos from '../../assets/LimitesJuridicos.json'

type State = {
  latitude: number,
  longitude: number,
  marginBottom: number,
  error: string
};

class Dashboard extends React.Component<{}, State> {
  state = {
    latitude: 0,
    longitude: 0,
    marginBottom: 1,
    error: ''
  };

  componentDidMount() {
    this.setPosition()
  }

  onMapReady = () => this.setState({ marginBottom: 0 })

  setPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: ''
        })
      },
      error => this.setState({ error: error.message })
    )
  };

  render() {
    const {
      latitude, longitude, marginBottom, error
    } = this.state

    return (
      <View style={styles.container}>
        {error !== '' && <Alert color={common.colors.red} msg={error} />}

        {error === '' && (
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
            // onMarkerDrag={() => this.setPosition()}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.0042,
              longitudeDelta: 0.0031
            }}
          >
            <Marker
              // draggable
              coordinate={{
                latitude,
                longitude
              }}
              tracksViewChange={false}
            />
            <Geojson geojson={LimitesJuridicos} />
          </MapView>
        )
        }
        {
          latitude !== 0 && (
            <FloatingAction
              actions={fabActions}
              color={common.colors.green}
              onPressItem={name => routeFix(name, this.state)}
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
    text: 'Coletar Área',
    name: 'collectArea',
    icon: (
      <Icon
        name="street-view"
        size={22}
        color={common.colors.white}
        style={styles.icon}
      />
    ),
    color: common.colors.green,
    position: 2
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
    position: 3
  }
]

export default Dashboard
