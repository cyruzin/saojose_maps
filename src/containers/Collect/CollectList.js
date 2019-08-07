/**
 * @flow
 * @format
 */

import React from 'react'
import {
  StyleSheet, ScrollView, ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import debounce from 'lodash/debounce'
import common from '../../util/common'
import { httpRequest } from '../../util/request'
import {
  Container, Text, Alert, TextInput
} from '../../components/UI'

type State = {
  fetch: boolean,
  data: [
    {
      id: number | string,
      classificacao: string,
      uso_solo: string,
      imovel: string,
      area_ha: number | string,
      bloco: number | string,
      latitude: number | string,
      longitude: number | string,
      descricao: string | null,
      id_usr_coleta: number | string,
      id_departamento: number | string,
      id_pendencia: number | string,
      id_tipo: number | string,
      dt_cadastro: string
    }
  ],
  userData: Object,
  error: string
};

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
      userData: {},
      error: ''
    }

    this.searchHandler = debounce(this.searchHandler, 800)
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = () => {
    AsyncStorage.getItem('token')
      .then((value) => {
        if (value !== null) {
          const data = JSON.parse(value)
          this.setState({ userData: data.userData })
        }
      })
      .then(() => this.fetchCollect())
  };

  fetchCollect = () => {
    this.setState({ fetch: true })
    const { userData } = this.state
    httpRequest(`/coleta/${userData.userid}/minhaColeta`, { method: 'GET' })
      .then(response => this.setState({ data: response, fetch: false }))
      .catch(error => this.setState({ error, fetch: false }))
  };

  searchHandler = (searchKeyword: string) => {
    if (searchKeyword === '') { return this.fetchCollect() }

    this.setState({ fetch: true })

    const { userData } = this.state

    return httpRequest(`/coleta/${userData.userid}/buscaColeta`, {
      method: 'POST',
      body: { query: searchKeyword.trim() }
    }).then(response => this.setState({ data: response, fetch: false }))
      .catch(error => this.setState({ error, fetch: false }))
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
              onChangeText={id => this.searchHandler(id)}
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
            && data && data.map(list => (
              <Container key={list.id} style={styles.content}>
                <Container style={styles.titleBox}>
                  <Text style={styles.title}>
                    Coleta #
                    {list.id}
                  </Text>
                </Container>
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
                    Latitude:
                    {' '}
                    {list.latitude || empty}
                  </Text>
                  <Text style={styles.text}>
                    Longitude:
                    {' '}
                    {list.longitude || empty}
                  </Text>
                  <Text style={styles.text}>
                    Observação:
                    {' '}
                    {list.descricao || empty}
                  </Text>
                  <Text style={styles.text}>
                    ID USR Coleta:
                    {' '}
                    {list.id_usr_coleta || empty}
                  </Text>
                  <Text style={styles.text}>
                    ID Departamento:
                    {' '}
                    {list.id_departamento || empty}
                  </Text>
                  <Text style={styles.text}>
                    ID Pendência:
                    {' '}
                    {list.id_pendencia || empty}
                  </Text>
                  <Text style={styles.text}>
                    ID Tipo:
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
