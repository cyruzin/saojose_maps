import * as React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Container, Text } from '../../components/UI'

class Dashboard extends React.Component {

    componentDidMount() {
        if (!this.props.authorized) Actions.reset('login')
    }

    componentDidUpdate() {
        if (!this.props.authorized) Actions.reset('login')
    }

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
})

const mapStateToProps = state => ({
    authorized: state.authentication.authorized
})

export default connect(mapStateToProps)(Dashboard)