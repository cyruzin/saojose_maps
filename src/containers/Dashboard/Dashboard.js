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
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FloatingAction } from 'react-native-floating-action'
import Geojson from 'react-native-geojson'

import common from '../../util/common'
import { routeFix, checkTokenExpiration } from '../../util/helpers'

import type { State } from '../../types/Dashboard'

import { Alert, Text } from '../../components/UI'

import LimitesJuridicos from '../../assets/LIMITES_JURIDICOS.json'
import Talhoes304050 from '../../assets/TALHOES_IMOV_030_040_050.json'
import Talhoes606162 from '../../assets/TALHOES_IMOV_060_061_062.json'
import Talhoes636465 from '../../assets/TALHOES_IMOV_063_064_065.json'
import Talhoes666768 from '../../assets/TALHOES_IMOV_066_067_068.json'
import Talhoes6970 from '../../assets/TALHOES_IMOV_069_070.json'
import Talhoes71 from '../../assets/TALHOES_IMOV_071.json'
import Talhoes7273 from '../../assets/TALHOES_IMOV_072_073.json'
import Talhoes747778 from '../../assets/TALHOES_IMOV_074_077_078.json'
import Talhoes7576 from '../../assets/TALHOES_IMOV_075_076.json'
import Talhoes858687899192939697 from '../../assets/TALHOES_IMOV_085_086_087_089_091_092_093_096_097.json'
import Talhoes110114115116118 from '../../assets/TALHOES_IMOV_110_114_115_116_118.json'

class Dashboard extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      area: [],
      latitude: 0,
      longitude: 0,
      marginBottom: 1,
      collected: false,
      markerConfig: false,
      talhoes304050: false,
      talhoes606162: false,
      talhoes636465: false,
      talhoes666768: false,
      talhoes6970: false,
      talhoes71: false,
      talhoes7273: false,
      talhoes747778: false,
      talhoes7576: false,
      talhoes858687899192939697: false,
      talhoes110114115116118: false,
      error: ''
    }
  }

  componentDidMount(): void {
    const {
      markerConfig, talhoes304050
    } = this.state

    if (
      !markerConfig
      && !talhoes304050
    ) this.clearArea()
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

  floatHandler = (name: string): void => {
    if (name === 'legenda') {
      this.setState({ markerConfig: true })
      return
    }
    Actions.replace(name, this.state)
  }

  render() {
    const {
      latitude, longitude, marginBottom, area, error,
      markerConfig, talhoes304050, talhoes606162, talhoes636465,
      talhoes666768, talhoes6970, talhoes71, talhoes7273,
      talhoes747778, talhoes7576, talhoes858687899192939697,
      talhoes110114115116118
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

        {markerConfig && (
        <View style={{
          position: 'absolute',
          zIndex: 3,
          backgroundColor: common.colors.dark,
          opacity: 0.9,
          height: 410,
          width: 400,
          top: 60,
          left: 0,
          bottom: 0,
          right: 0
        }}
        >
          <Text
            style={{
              height: 40,
              fontSize: 25,
              marginBottom: 10,
              color: common.colors.white,
              textAlign: 'center'
            }}
            onPress={() => this.setState({ markerConfig: false })}
          >
          x
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes304050}
              onValueChange={() => this.setState({ talhoes304050: !talhoes304050 })}
            />
            <Text style={{
              color: common.colors.white,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_030_040_050
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes606162}
              onValueChange={() => this.setState({ talhoes606162: !talhoes606162 })}
            />
            <Text style={{
              color: common.colors.yellow,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_060_061_062
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes636465}
              onValueChange={() => this.setState({ talhoes636465: !talhoes636465 })}
            />
            <Text style={{
              color: common.colors.green,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_063_064_065
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes666768}
              onValueChange={() => this.setState({ talhoes666768: !talhoes666768 })}
            />
            <Text style={{
              color: common.colors.green2,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_066_067_068
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes6970}
              onValueChange={() => this.setState({ talhoes6970: !talhoes6970 })}
            />
            <Text style={{
              color: common.colors.pink,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_069_070
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes71}
              onValueChange={() => this.setState({ talhoes71: !talhoes71 })}
            />
            <Text style={{
              color: common.colors.cyan,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_071
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes7273}
              onValueChange={() => this.setState({ talhoes7273: !talhoes7273 })}
            />
            <Text style={{
              color: common.colors.cream,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_072_073
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes747778}
              onValueChange={() => this.setState({ talhoes747778: !talhoes747778 })}
            />
            <Text style={{
              color: common.colors.lightGray,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_074_077_078
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes7576}
              onValueChange={() => this.setState({ talhoes7576: !talhoes7576 })}
            />
            <Text style={{
              color: common.colors.black,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_075_076
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes858687899192939697}
              onValueChange={() => this.setState({
                talhoes858687899192939697: !talhoes858687899192939697
              })}
            />
            <Text style={{
              color: common.colors.lightPink,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_085_086_087_089_091_092_093_096_097
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={talhoes110114115116118}
              onValueChange={() => this.setState({
                talhoes110114115116118: !talhoes110114115116118
              })}
            />
            <Text style={{
              color: common.colors.lightPurple,
              fontSize: 15,
              marginTop: 5
            }}
            >
              TALHOES_IMOV_110_114_115_116_118
            </Text>
          </View>

        </View>
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

          {talhoes304050 && (
          <Geojson
            geojson={Talhoes304050}
            strokeWidth={1.2}
            strokeColor={common.colors.white}
          />
          )}

          {talhoes606162 && (
          <Geojson
            geojson={Talhoes606162}
            strokeWidth={1.2}
            strokeColor={common.colors.yellow}
          />
          )}

          {talhoes636465 && (
          <Geojson
            geojson={Talhoes636465}
            strokeWidth={1.2}
            strokeColor={common.colors.green}
          />
          )}

          {talhoes666768 && (
          <Geojson
            geojson={Talhoes666768}
            strokeWidth={1.2}
            strokeColor={common.colors.green2}
          />
          )}

          {talhoes6970 && (
          <Geojson
            geojson={Talhoes6970}
            strokeWidth={1.2}
            strokeColor={common.colors.pink}
          />
          )}

          {talhoes71 && (
          <Geojson
            geojson={Talhoes71}
            strokeWidth={1.2}
            strokeColor={common.colors.cyan}
          />
          )}

          {talhoes7273 && (
          <Geojson
            geojson={Talhoes7273}
            strokeWidth={1.2}
            strokeColor={common.colors.cream}
          />
          )}


          {talhoes747778 && (
          <Geojson
            geojson={Talhoes747778}
            strokeWidth={1.2}
            strokeColor={common.colors.lightGray}
          />
          )}

          {talhoes7576 && (
          <Geojson
            geojson={Talhoes7576}
            strokeWidth={1.2}
            strokeColor={common.colors.black}
          />
          )}

          {talhoes858687899192939697 && (
          <Geojson
            geojson={Talhoes858687899192939697}
            strokeWidth={1.2}
            strokeColor={common.colors.lightPink}
          />
          )}

          {talhoes110114115116118 && (
          <Geojson
            geojson={Talhoes110114115116118}
            strokeWidth={1.2}
            strokeColor={common.colors.lightPurple}
          />
          )}

        </MapView>

        {
          latitude !== 0 && (
            <FloatingAction
              actions={fabActions}
              color={common.colors.green}
              onPressItem={(name) => this.floatHandler((name))}
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
  },
  {
    text: 'Legenda',
    name: 'legenda',
    icon: (
      <Icon
        name="map"
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
