/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet, Picker, ActivityIndicator, Alert as AlertRN
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'
import common from '../../util/common'
import { httpRequest } from '../../util/request'
import {
  Container, Text, Button, Alert, TextInput
} from '../../components/UI'

type State = {
  fetch: boolean,
  coletaDepartamento: Array<Object>,
  departamentoID: number | string,
  coletaTipo: Array<Object>,
  tipoID: number | string,
  userData: Object,
  descricao: string,
  error: string
}

type Props = {
  latitude: string,
  longitude: string
}

class CollectForm extends React.Component<Props, State> {
  state = {
    fetch: false,
    coletaDepartamento: [],
    departamentoID: '',
    coletaTipo: [],
    tipoID: '',
    userData: {},
    descricao: '',
    error: ''
  }

  componentDidMount() {
    this.getUserData()
    this.fetchCollectData()
  }

  fetchCollectData = () => {
    this.setState({ fetch: true })
    Promise.all([
      httpRequest('/coletaDepart', { method: 'GET' }),
      httpRequest('/coletaTipo', { method: 'GET' })
    ]).then(([coletaDepartamento, coletaTipo]) => {
      this.setState({
        coletaDepartamento,
        coletaTipo,
        fetch: false
      })
    }).catch(error => this.setState({ error, fetch: false }))
  }

  getUserData = () => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value !== null) {
          const data = JSON.parse(value)
          this.setState({ userData: data.userData })
        }
      })
  }

  sendData = () => {
    const {
      departamentoID, tipoID, userData, descricao
    } = this.state
    const { latitude, longitude } = this.props

    if (departamentoID === '' || tipoID === '') return

    httpRequest('/coleta', {
      method: 'POST',
      body: {
        latitude,
        longitude,
        id_departamento: departamentoID,
        id_tipo: departamentoID,
        id_usr_coleta: userData.userid,
        descricao
      }
    }).then(() => this.alert(
      'Sucesso',
      'Coleta realizada',
      () => Actions.replace('collectList')
    ))
      .catch(error => this.setState({ error }))
  }

  alert = (title: string, body: string, callback: any) => {
    AlertRN.alert(
      title,
      body,
      [{ text: 'OK', onPress: callback }],
      { cancelable: false }
    )
  }

  render() {
    const {
      fetch, coletaDepartamento, departamentoID,
      coletaTipo, tipoID, error
    } = this.state

    return (
      <Container style={styles.container}>

        {fetch && error === ''
          && <ActivityIndicator style={styles.activityIndicator} color={common.colors.white} />}

        {!fetch && error !== '' && <Alert color={common.colors.red} msg={error} />}

        {
          !fetch && error === ''
          && (
            <>
              <Text style={styles.text}>Coleta de Ponto</Text>

              <Picker
                selectedValue={departamentoID}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(id) => {
                  if (id !== -1) {
                    this.setState({ departamentoID: id })
                  }
                }
                }
              >
                <Picker.Item label="Selecione um departamento" value={-1} />
                {coletaDepartamento.map(dep => (
                  <Picker.Item
                    key={dep.id}
                    label={dep.nome}
                    value={dep.id}
                  />
                ))}
              </Picker>

              <Picker
                selectedValue={tipoID}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(id) => {
                  if (id !== -1) {
                    this.setState({ tipoID: id })
                  }
                }
                }
              >
                <Picker.Item label="Selecione um tipo" value={-1} />
                {coletaTipo.map(dep => (
                  <Picker.Item
                    key={dep.id}
                    label={dep.nome}
                    value={dep.id}
                  />
                ))}
              </Picker>

              <TextInput
                placeholder="Observação"
                placeholderTextColor={common.colors.lightGray}
                selectionColor={common.colors.green}
                style={styles.input}
                multiline
                numberOfLines={5}
                onChangeText={descricao => this.setState({ descricao })}
              />

              <Button
                title="ENVIAR"
                onPress={() => this.sendData()}
                style={styles.button}
              />
            </>
          )
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

export default CollectForm
