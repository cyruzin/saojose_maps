import * as React from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { common } from '../../util/common'
import jwtDecode from 'jwt-decode'
import { Container, Text, TextInput } from '../../components/UI'

class CollectForm extends React.Component {

    render () {
        const { latitude, longitude, token } = this.props
        let user = jwtDecode(token)
        console.log(user)

        return (
            <Container style={styles.container}>
                <Text style={styles.text}>Coleta de Ponto</Text>
                <TextInput
                    value={'Latitude: ' + latitude.toString()}
                    placeholderTextColor={common.colors.lightGray}
                    selectionColor={common.colors.green}
                    editable={false}
                    style={styles.input} />
                <TextInput
                    value={'Longitude: ' + longitude.toString()}
                    placeholderTextColor={common.colors.lightGray}
                    selectionColor={common.colors.green}
                    editable={false}
                    style={styles.input} />
                <TextInput
                    placeholder='Usuário'
                    value={'Usuário: ' + user.user}
                    placeholderTextColor={common.colors.lightGray}
                    selectionColor={common.colors.green}
                    editable={false}
                    style={styles.input} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: common.colors.dark
    },
    text: {
        color: common.colors.white,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        marginBottom: 20,
        borderColor: common.colors.green,
        color: common.colors.white,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 15,
    },
})

const mapStateToProps = state => ({
    token: state.authentication.token
})

export default connect(mapStateToProps)(CollectForm)