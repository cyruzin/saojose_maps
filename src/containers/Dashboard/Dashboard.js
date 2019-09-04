/**
 * @flow
 * @format
 */

import * as React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Actions } from 'react-native-router-flux'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geojson from 'react-native-geojson'
import { FloatingAction } from 'react-native-floating-action'

import common from '../../util/common'
import { routeFix, checkTokenExpiration } from '../../util/helpers'

import type { State } from '../../types/Dashboard'

import { Alert, Text } from '../../components/UI'

import LimitesJuridicos from '../../assets/LIMITES_JURIDICOS.json'
// import Talhoes304050 from '../../assets/TALHOES_IMOV_030_040_050.json'
// import Talhoes606162 from '../../assets/TALHOES_IMOV_060_061_062.json'
// import Talhoes636465 from '../../assets/TALHOES_IMOV_063_064_065.json'
// import Talhoes666768 from '../../assets/TALHOES_IMOV_066_067_068.json'
// import Talhoes6970 from '../../assets/TALHOES_IMOV_069_070.json'
// import Talhoes71 from '../../assets/TALHOES_IMOV_071.json'
// import Talhoes7273 from '../../assets/TALHOES_IMOV_072_073.json'
// import Talhoes747778 from '../../assets/TALHOES_IMOV_074_077_078.json'
// import Talhoes7576 from '../../assets/TALHOES_IMOV_075_076.json'
// import Talhoes858687899192939697 from '../../assets/TALHOES_IMOV_085_086_087_089_091_092_093_096_097.json'
// import Talhoes110114115116118 from '../../assets/TALHOES_IMOV_110_114_115_116_118.json'

class Dashboard extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      area: [],
      latitude: 0,
      longitude: 0,
      marginBottom: 1,
      collected: false,
      error: ''
    }
  }

  componentDidMount(): void {
    this.clearArea()
  }

  componentDidUpdate(): void {
    checkTokenExpiration()
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

  clearArea = (): void => {
    this.setState({ area: [] })
    this.setPosition()
  }

  collectCoordinates = (name: string): void => {
    routeFix(name, this.state)
  }

  render() {
    const {
      latitude, longitude, marginBottom, area, error
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

        {area.length > 1 && (
        <TouchableHighlight style={styles.areaBox} onPress={this.clearArea}>
          <Text style={styles.areaText}>
            Colentando área:
            {' '}
            {area.length}
            {' '}
            coletadas
          </Text>
        </TouchableHighlight>
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
              longitude: event.nativeEvent.coordinate.longitude,
              area: [...this.state.area, {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude
              }
              ]
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
          {/* <Geojson
            geojson={Talhoes304050}
            strokeWidth={1.5}
            strokeColor={common.colors.white}
          />
          <Geojson
            geojson={Talhoes606162}
            strokeWidth={1.5}
            strokeColor={common.colors.yellow}
          />
          <Geojson
            geojson={Talhoes636465}
            strokeWidth={1.5}
            strokeColor={common.colors.green}
          />
          <Geojson
            geojson={Talhoes666768}
            strokeWidth={1.5}
            strokeColor={common.colors.green2}
          />
          <Geojson
            geojson={Talhoes6970}
            strokeWidth={1.5}
            strokeColor={common.colors.pink}
          />
          <Geojson
            geojson={Talhoes71}
            strokeWidth={1.5}
            strokeColor={common.colors.cyan}
          />
          <Geojson
            geojson={Talhoes7273}
            strokeWidth={1.5}
            strokeColor={common.colors.cream}
          />
          <Geojson
            geojson={Talhoes747778}
            strokeWidth={1.5}
            strokeColor={common.colors.lightGray}
          />
          <Geojson
            geojson={Talhoes7576}
            strokeWidth={1.5}
            strokeColor={common.colors.dark}
          />
          <Geojson
            geojson={Talhoes858687899192939697}
            strokeWidth={1.5}
            strokeColor={common.colors.lightPink}
          />
          <Geojson
            geojson={Talhoes110114115116118}
            strokeWidth={1.5}
            strokeColor={common.colors.lightPurple}
          /> */}
        </MapView>

        {
          latitude !== 0 && (
            <FloatingAction
              actions={fabActions}
              color={common.colors.green}
              onPressItem={(name) => Actions.replace(name, this.state)}
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
  },
  areaBox: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    top: 5,
    right: 0,
    zIndex: 3,
    width: 200,
    height: 40,
    backgroundColor: common.colors.green
  },
  areaText: {
    color: common.colors.white,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  }
})

const fabActions = [
  {
    text: 'Coletar Ponto / Área',
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
