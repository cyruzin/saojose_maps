/**
 * @flow 
 * @format
 */

import React from 'react'
import { StyleSheet, Picker, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { common } from '../../util/common'
import { httpFetch } from '../../util/request'
import jwtDecode from 'jwt-decode'
import { Container, Text, TextInput, Button, Alert } from '../../components/UI'

type State = {
    fetch: boolean,
    coletaDepartamento: Array<Object>,
    departamentoID: number | string,
    coletaTipo: Array<Object>,
    tipoID: number | string,
    error: string
}

type Props = {
    latitude: string,
    longitude: string,
    token: string
}

class CollectForm extends React.Component<Props, State> {

    state = {
        fetch: false,
        coletaDepartamento: [],
        departamentoID: '',
        coletaTipo: [],
        tipoID: '',
        error: ''
    }

    componentDidMount () {
        this.setState({ fetch: true })
        Promise.all([
            httpFetch({ method: 'GET', url: '/coletaDepart' }),
            httpFetch({ method: 'GET', url: '/coletaTipo' })
        ]).then(([coletaDepartamento, coletaTipo]) => {
            this.setState({
                coletaDepartamento: coletaDepartamento.data,
                coletaTipo: coletaTipo.data,
                fetch: false
            })
        }).catch(error => this.setState({ error: error, fetch: false }))
    }

    sendData = () => {
        const { departamentoID, tipoID } = this.state
        const { latitude, longitude, token } = this.props
        let user = jwtDecode(token)

        if (departamentoID === '' || tipoID === '') return

        httpFetch({
            method: 'POST',
            url: '/coleta',
            data: {
                latitude: latitude,
                longitude: longitude,
                id_departamento: departamentoID,
                id_tipo: departamentoID,
                id_usr_coleta: user.userid
            }
        }).then(() => Actions.replace('collectList'))
            .catch(error => this.setState({ error: error }))
    }

    render () {
        const { fetch, coletaDepartamento, departamentoID, coletaTipo, tipoID, error } = this.state
        const { latitude, longitude, token } = this.props
        let user = jwtDecode(token)

        return (
            <Container style={styles.container}>

                {fetch && error === '' && <ActivityIndicator style={styles.activityIndicator} color={common.colors.white} />}

                {!fetch && error !== '' && <Alert color={common.colors.red} msg={error} />}

                {!fetch && error === '' &&
                    <>
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

                        <Picker
                            selectedValue={departamentoID}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={departamentoID => {
                                if (departamentoID !== -1) {
                                    this.setState({ departamentoID: departamentoID })
                                }
                            }
                            }>
                            <Picker.Item label="Selecione um departamento" value={-1} />
                            {coletaDepartamento.map(dep => (
                                <Picker.Item
                                    key={dep.id}
                                    label={dep.nome}
                                    value={dep.id} />
                            ))}
                        </Picker>

                        <Picker
                            selectedValue={tipoID}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={tipoID => {
                                if (tipoID !== -1) {
                                    this.setState({ tipoID: tipoID })
                                }
                            }
                            }>
                            <Picker.Item label="Selecione um tipo" value={-1} />
                            {coletaTipo.map(dep => (
                                <Picker.Item
                                    key={dep.id}
                                    label={dep.nome}
                                    value={dep.id} />
                            ))}
                        </Picker>

                        <Button
                            title='ENVIAR'
                            onPress={() => this.sendData()}
                            style={styles.button} />
                    </>
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: common.colors.dark
    },
    activityIndicator: {
        marginTop: 10,
    },
    text: {
        color: common.colors.white,
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
        fontWeight: 'bold'
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
    picker: {
        width: '100%',
        height: 65,
        color: common.colors.white
    },
    pickerItem: {
        height: 40
    },
    button: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50
    }
})

const mapStateToProps = state => ({
    token: state.authentication.token
})

export default connect(mapStateToProps)(CollectForm)