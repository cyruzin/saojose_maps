/**
 * @flow
 * @format
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geojson from 'react-native-geojson'
import { routeFix } from '../../util/helpers'
import common from '../../util/common'
import {
  Alert, FloatButton
} from '../../components/UI'
import LimitesJuridicos from '../../assets/LimitesJuridicos.json'

type State = {
    latitude: number,
    longitude: number,
    error: string
}

class CollectPoint extends React.Component<{}, State> {
    state = {
      latitude: 37.78825,
      longitude: -122.4324,
      error: ''
    }

    componentDidMount() {
      global.navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: ''
        })
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },)
    }

    render() {
      const { latitude, longitude, error } = this.state

      return (
        <>
          {error !== '' && <Alert color={common.colors.red} msg={error} />}

          {error === ''
                    && (
                    <View style={styles.container}>
                      <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        loadingIndicatorColor={common.colors.green}
                        loadingEnabled
                        showsUserLocation
                        showsMyLocationButton
                        followsUserLocation
                        region={{
                          latitude,
                          longitude,
                          latitudeDelta: 0.0042,
                          longitudeDelta: 0.0031
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude,
                            longitude
                          }}
                        />
                        <Geojson geojson={LimitesJuridicos} />
                      </MapView>
                      {latitude !== 37.78825
                            && (
                            <FloatButton
                              icon="plus"
                              onPress={() => routeFix('collectForm', this.state)}
                            />
                            )
                        }
                    </View>
                    )
                }
        </>
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
})

export default CollectPoint
