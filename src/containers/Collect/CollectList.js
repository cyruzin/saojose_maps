/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import debounce from 'lodash/debounce'

import common from '../../util/common'
import { httpRequest } from '../../util/request'
import { routeFix } from '../../util/helpers'

import type { State } from '../../types/Collect/CollectList'

import {
  Container,
  Text,
  Alert,
  TextInput
} from '../../components/UI'

class CollectList extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      fetch: false,
      data: [
        {
          id: '',
          classificacao: '',
          uso_solo: '',
          imovel: '',
          area_ha: '',
          bloco: '',
          latitude: '',
          longitude: '',
          descricao: '',
          id_usr_coleta: '',
          id_departamento: '',
          id_pendencia: '',
          id_tipo: '',
          dt_cadastro: '',
        },
      ],
      userData: {
        user: '',
        userid: '',
        username: '',
        usermail: '',
        expires: 0
      },
      error: ''
    }

    this.searchHandler = debounce(this.searchHandler, 800)
  }

  componentDidMount(): void {
    this.getUserData()
  }

  getUserData = (): void => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value !== null) {
          const data = JSON.parse(value)
          this.setState({ userData: data.userData })
        }
      })
      .then(() => this.fetchCollect())
  }

  fetchCollect = (): void => {
    this.setState({ fetch: true })
    const { userData } = this.state
    httpRequest(`/coleta/${userData.userid}/minhaColeta`, { method: 'GET' })
      .then((response) => this.setState({ data: response, fetch: false }))
      .catch((error) => this.setState({ error, fetch: false }))
  }

  fetchImages = (collectID: number | string): void => {
    this.setState({ fetch: true })
    httpRequest(`/coleta/${collectID}/minhaImagem`, { method: 'GET' })
      .then((response) => {
        console.log(response)
        this.setState({ fetch: false }, () => routeFix('collectImage', {
          img1: response.length > 1 ? response[0] : response,
          img2: response[1],
          img3: response[2]
        }))
      }).catch((error) => this.setState({ error, fetch: false }))
  }

  searchHandler = (searchKeyword: string): void => {
    if (searchKeyword === '') { return this.fetchCollect() }

    this.setState({ fetch: true })

    const { userData } = this.state

    return httpRequest(`/coleta/${userData.userid}/buscaColeta`, {
      method: 'POST',
      body: { query: searchKeyword.trim() }
    }).then((response) => this.setState({ data: response, fetch: false }))
      .catch((error) => this.setState({ error, fetch: false }))
  }

  render() {
    const { fetch, data, error } = this.state
    const empty = '-'

    return (
      <Container style={styles.container}>
        <ScrollView>
          {error === '' && (
            <TextInput
              placeholder="Busca"
              editable={!fetch}
              placeholderTextColor={common.colors.lightGray}
              selectionColor={common.colors.green}
              style={styles.input}
              onChangeText={(id) => this.searchHandler(id)}
            />
          )}

          {!fetch && data === null
            && (
              <Text style={styles.searchNoResult}>Nenhum Resultado</Text>
            )}

          {fetch && <ActivityIndicator color={common.colors.white} />}

          {!fetch && error !== '' && (
            <Alert color={common.colors.red} msg={error} />
          )}

          {!fetch
            && error === ''
            && data && data.map((list) => (
              <Container key={list.id} style={styles.content}>
                <TouchableHighlight style={styles.titleBox}>
                  <Text style={styles.title} onPress={() => this.fetchImages(list.id)}>
                    Coleta #
                    {list.id}
                  </Text>
                </TouchableHighlight>
                <Container style={styles.textBox}>
                  <Text style={styles.text}>
                    Classificação:
                    {' '}
                    {list.classificacao || empty}
                  </Text>
                  <Text style={styles.text}>
                    Uso Solo:
                    {' '}
                    {list.uso_solo || empty}
                  </Text>
                  <Text style={styles.text}>
                    Imovel:
                    {' '}
                    {list.imovel || empty}
                  </Text>
                  <Text style={styles.text}>
                    Área HA:
                    {' '}
                    {list.area_ha || empty}
                  </Text>
                  <Text style={styles.text}>
                    Bloco:
                    {' '}
                    {list.bloco || empty}
                  </Text>
                  <Text style={styles.text}>
                    Observação:
                    {' '}
                    {list.descricao || empty}
                  </Text>
                  <Text style={styles.text}>
                    Usuário Coleta:
                    {' '}
                    {list.id_usr_coleta || empty}
                  </Text>
                  <Text style={styles.text}>
                    Departamento:
                    {' '}
                    {list.id_departamento || empty}
                  </Text>
                  <Text style={styles.text}>
                    Pendência:
                    {' '}
                    {list.id_pendencia || empty}
                  </Text>
                  <Text style={styles.text}>
                    Tipo:
                    {' '}
                    {list.id_tipo || empty}
                  </Text>
                  <Text style={styles.text}>
                    Data:
                    {' '}
                    {list.dt_cadastro || empty}
                  </Text>
                </Container>
              </Container>
          ))}
        </ScrollView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: common.colors.dark
  },
  content: {
    marginBottom: 10
  },
  titleBox: {
    backgroundColor: common.colors.green
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: common.colors.white
  },
  textBox: {
    padding: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: common.colors.white
  },
  text: {
    marginBottom: 5,
    color: common.colors.white
  },
  searchNoResult: {
    marginTop: 20,
    color: common.colors.white,
    fontSize: 16,
    textAlign: 'center',
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
})

export default CollectList
