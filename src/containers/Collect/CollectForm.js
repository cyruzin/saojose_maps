/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet, Picker, Alert as AlertRN,
  TouchableOpacity, View, Image, ActivityIndicator
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import common from '../../util/common'
import { httpRequest } from '../../util/request'
import {
  Container, Text, Button, Alert, TextInput
} from '../../components/UI'

type State = {
  fetch: boolean,
  fetchSelect: boolean,
  showCamera: boolean,
  fotos: Array<Object>,
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
    fetchSelect: false,
    showCamera: false,
    fotos: [],
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
    this.setState({ fetchSelect: true })
    Promise.all([
      httpRequest('/coletaDepart', { method: 'GET' }),
      httpRequest('/coletaTipo', { method: 'GET' })
    ]).then(([coletaDepartamento, coletaTipo]) => {
      this.setState({
        coletaDepartamento,
        coletaTipo,
        fetchSelect: false
      })
    }).catch(error => this.setState({ error, fetchSelect: false }))
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
      departamentoID, tipoID, userData, descricao,
      fotos
    } = this.state
    const { latitude, longitude } = this.props

    if (departamentoID === '' || tipoID === '') {
      this.alert('Atenção', 'Preecha todos os campos')
      return false
    }

    return this.setState({ fetch: true }, () => httpRequest('/coleta', {
      method: 'POST',
      body: {
        latitude,
        longitude,
        id_departamento: departamentoID,
        id_tipo: departamentoID,
        id_usr_coleta: userData.userid,
        descricao,
        img1: fotos[0] ? fotos[0].uri : '', // Salvando a uri por enquanto
        img2: fotos[1] ? fotos[1].uri : '',
        img3: fotos[2] ? fotos[2].uri : ''
      }
    }).then(() => {
      this.setState({ fetch: false })
      this.alert(
        'Sucesso',
        'Coleta realizada',
        () => Actions.replace('collectList')
      )
    })
      .catch(error => this.setState({ error, fetch: false })))
  }

  alert = (title: string, body: string, callback: any) => {
    AlertRN.alert(
      title,
      body,
      [{ text: 'OK', onPress: callback }],
      { cancelable: false }
    )
  }

  toggleCamera = () => {
    const { showCamera } = this.state
    this.setState({ showCamera: !showCamera })
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      const { fotos, showCamera } = this.state

      this.setState({
        fotos: [...fotos, { base64: data.base64, uri: data.uri }],
        showCamera: !showCamera
      })
    }
  }

  removePicture = (foto) => {
    this.alert('Remover', 'Tem certeza que deseja remover essa foto?', () => {
      const newFotos = this.state.fotos.filter(f => f.uri !== foto.uri)
      this.setState({ fotos: newFotos })
    })
  }

  render() {
    const {
      fetch, fetchSelect, showCamera, fotos, coletaDepartamento, departamentoID,
      coletaTipo, tipoID, descricao, error
    } = this.state

    return (
      <Container style={styles.container}>

        {fetchSelect
        && <ActivityIndicator style={styles.activityIndicator} color={common.colors.white} />}

        {!fetchSelect && !fetch && error !== ''
        && <Alert color={common.colors.red} msg={error} />}

        {!fetchSelect && error === '' && !showCamera && (
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
            numberOfLines={2}
            value={descricao}
            onChangeText={obs => this.setState({ descricao: obs })}
          />

          {fotos.length < 3 ? (
            <Text
              onPress={this.toggleCamera}
              style={{
                color: common.colors.white,
                padding: 15,
              }}
              hitSlop={{
                top: 30,
                left: 30,
                bottom: 30,
                right: 30
              }}
            >
              <Icon
                name="camera"
                size={16}
                color={common.colors.white}
              />
              {'  '}
              Capturar Imagem
            </Text>
          )
            : (
              <Text style={{
                color: common.colors.white,
                padding: 15,
                fontSize: 14,
                fontWeight: 'bold'
              }}
              >
Quantidade máxima de fotos atingida

              </Text>
            )
          }

          {fotos.length > 0
            && (
              <>
                <Text
                  style={{
                    color: common.colors.white,
                    marginLeft: 15,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                Fotos em anexo:
                  {' '}
                  {fotos.length}
                </Text>
                <View style={{ marginLeft: 5, flexDirection: 'row', marginBottom: 10 }}>
                  {fotos.length > 0 && fotos.map(foto => (
                    <View key={foto.uri}>
                      <Image
                        source={{ uri: foto.uri }}
                        style={{
                          marginLeft: 10,
                          width: 100,
                          height: 100
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          marginTop: 10,
                          color: '#fff',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}
                        hitSlop={{
                          top: 30,
                          left: 30,
                          bottom: 30,
                          right: 30
                        }}
                        onPress={() => this.removePicture(foto)}
                      >
                      X
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )
          }

          <Button
            title={!fetch ? 'ENVIAR' : 'ENVIANDO...'}
            onPress={() => this.sendData()}
            style={styles.button}
          />
        </>
        )
        }

        {showCamera
        && (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'black'
        }}
        >
          <RNCamera
            ref={ref => this.camera = ref}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
            <TouchableOpacity
              onPress={this.takePicture}
              style={styles.capture}
            />
          </View>
        </View>
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
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: common.colors.lightGray,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: common.colors.green,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

export default CollectForm
