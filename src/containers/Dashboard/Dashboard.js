import * as React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Container, Text } from '../../components/UI'

class Dashboard extends React.Component {

    render() {

        return (
            <MapView
                style={styles.container}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: -6.270565,
                    longitude: 106.759550,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}>
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Dashboard