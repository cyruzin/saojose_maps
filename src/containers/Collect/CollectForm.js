/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet,
  Picker,
  Alert as AlertRN,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native'

import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'

import { httpRequest } from '../../util/request'
import { UPLOAD_ACCESS_KEY } from '../../util/constants'
import common from '../../util/common'

import type { State, Props } from '../../types/Collect/CollectForm'

import {
  Container,
  Text,
  Button,
  Alert,
  TextInput
} from '../../components/UI'

class CollectForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
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
  }


  componentDidMount(): void {
    this.getUserData()
    this.fetchCollectData()
  }

  fetchCollectData = (): void => {
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
    }).catch((error) => this.setState({ error, fetchSelect: false }))
  }

  getUserData = (): void => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value !== null) {
          const data = JSON.parse(value)
          this.setState({ userData: data.userData })
        }
      })
  }

  sendData = (): void => {
    const { departamentoID, tipoID, fotos } = this.state

    if (departamentoID === '' || tipoID === '') {
      this.alert('Atenção', 'Preecha todos os campos')
      return
    }

    this.sendCollect()
      .then((response) => {
        if (fotos.length === 0) {
          this.alert('Sucesso', 'Coleta realizada', () => Actions.replace('collectList'))
          return
        }
        this.sendImages(response)
          .then((responseImages) => {
            if (responseImages) {
              this.alert('Sucesso', 'Coleta realizada', () => Actions.replace('collectList'))
            }
          })
      })
  }

  sendCollect = async (): Promise<any> => {
    const {
      departamentoID, userData, descricao
    } = this.state

    const { latitude, longitude } = this.props

    try {
      const request = await httpRequest(
        '/coleta', {
          method: 'POST',
          body: {
            latitude,
            longitude,
            id_departamento: departamentoID,
            id_tipo: departamentoID,
            id_usr_coleta: userData.userid,
            descricao
          }
        }
      )
      this.setState({ fetch: true })
      return request
    } catch (error) {
      return this.setState({ error, fetch: false })
    }
  }

  sendImages = async (response: Object): any => {
    try {
      const { fotos } = this.state
      const { id } = response
      const form = new FormData()

      fotos.forEach((value, index) => {
        form.append('arquivo[]', {
          uri: value.uri,
          type: 'image/jpeg',
          name: `image${index + 1}`
        })
      })

      const responseImages = await fetch(
        `http://dev.gddoc.com.br/maps_sj/gravaimg/${UPLOAD_ACCESS_KEY}/${id}`, {
          method: 'POST',
          body: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      await responseImages.json()
      if (!responseImages.ok) this.setState({ fetch: false })
      this.setState({ fetch: false })
      return true
    } catch (error) {
      return this.setState({ error: 'Não possível enviar as imagens', fetch: false })
    }
  }

  alert = (title: string, body: string, callback: any): void => {
    AlertRN.alert(
      title,
      body,
      [{ text: 'OK', onPress: callback }],
      { cancelable: false }
    )
  }

  toggleCamera = (): void => {
    const { showCamera } = this.state
    this.setState({ showCamera: !showCamera })
  }

  takePicture = async (): Promise<void> => {
    if (this.camera) {
      const options = { quality: 0.1, base64: false }
      const data = await this.camera.takePictureAsync(options)
      const { fotos, showCamera } = this.state

      this.setState({
        fotos: [...fotos, { uri: data.uri }],
        showCamera: !showCamera
      })
    }
  }

  removePicture = (foto: Object): void => {
    this.alert('Remover', 'Tem certeza que deseja remover essa foto?', () => {
      const newFotos = this.state.fotos.filter((f) => f.uri !== foto.uri)
      this.setState({ fotos: newFotos })
    })
  }

  render() {
    const {
      fetch, fetchSelect, showCamera, fotos, coletaDepartamento,
      departamentoID, coletaTipo, tipoID, descricao, error
    } = this.state

    return (
      <Container style={styles.container}>

        {fetchSelect
          && (
            <ActivityIndicator
              style={styles.activityIndicator}
              color={common.colors.white}
            />
          )}

        {!fetchSelect
          && !fetch && error !== ''
          && (
            <Alert
              color={common.colors.red}
              msg={error}
            />
          )}

        {!fetchSelect && !showCamera && (
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
              }}
            >
              <Picker.Item label="Selecione um departamento" value={-1} />
              {coletaDepartamento.map((dep) => (
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
              }}
            >
              <Picker.Item label="Selecione um tipo" value={-1} />
              {coletaTipo.map((dep) => (
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
              onChangeText={(obs) => this.setState({ descricao: obs })}
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
              )}

            {fotos.length > 0
              && (
                <>
                  <Text style={styles.imageAttachment}>
                    Fotos em anexo:
                    {' '}
                    {fotos.length}
                  </Text>
                  <View style={styles.imageBox}>
                    {fotos.length > 0 && fotos.map((foto) => (
                      <View key={foto.uri}>
                        <Image
                          source={{ uri: foto.uri }}
                          style={styles.image}
                        />
                        <Text
                          style={styles.imageText}
                          hitSlop={styles.imageTextHitSlop}
                          onPress={() => this.removePicture(foto)}
                        >
                          X
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

            <Button
              title={!fetch ? 'ENVIAR' : 'ENVIANDO...'}
              disabled={!!fetch}
              onPress={() => this.sendData()}
              style={styles.button}
            />
          </>
        )}

        {showCamera
          && (
            <View style={styles.cameraBox}>
              <RNCamera
                ref={(ref) => this.camera = ref}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
              />
              <View style={styles.cameraButton}>
                <TouchableOpacity
                  onPress={this.takePicture}
                  style={styles.capture}
                />
              </View>
            </View>
          )}
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
  },
  imageAttachment: {
    color: common.colors.white,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  imageBox: {
    marginLeft: 5,
    flexDirection: 'row',
    marginBottom: 10
  },
  image: {
    marginLeft: 10,
    width: 100,
    height: 100
  },
  imageText: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageTextHitSlop: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30
  },
  cameraBox: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  cameraButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default CollectForm
