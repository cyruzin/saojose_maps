/**
 * @flow
 * @format
 */

import React from 'react'
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { common } from '../../util/common'
import { httpFetch } from '../../util/request'
import { Container, Text, Alert } from '../../components/UI'

type State = {
    fetch: boolean,
    data: [{
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
        dt_cadastro: string,
    }],
    error: string
}

class CollectList extends React.Component<{}, State> {

    state = {
        fetch: false,
        data: [{
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
        }],
        error: ''
    }

    componentDidMount () {
        this.setState({ fetch: true })

        httpFetch({ url: '/coleta', method: 'GET' })
            .then(response => this.setState({ data: response.data, fetch: false }))
            .catch(error => this.setState({ error: error, fetch: false }))
    }

    render () {
        const { fetch, data, error } = this.state
        const empty = '-'

        return (
            <Container style={styles.container}>
                <ScrollView>
                    {fetch && <ActivityIndicator color={common.colors.white} />}

                    {!fetch && error !== '' && <Alert color={common.colors.red} msg={error} />}

                    {!fetch && error === '' && data > 0 && data.map(list => {
                        return (
                            <Container key={list.id} style={styles.content}>
                                <Container style={styles.titleBox}>
                                    <Text style={styles.title}>Coleta #{list.id}</Text>
                                </Container>
                                <Container style={styles.textBox}>
                                    <Text style={styles.text}>
                                        Classificação: {list.classificacao || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Uso Solo: {list.uso_solo || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Imovel: {list.imovel || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Área HA: {list.area_ha || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Bloco: {list.bloco || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Latitude: {list.latitude || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Longitude: {list.longitude || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Descrição: {list.descricao || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        ID USR Coleta: {list.id_usr_coleta || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        ID Departamento: {list.id_departamento || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        ID Pendência: {list.id_pendencia || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        ID Tipo: {list.id_tipo || empty}
                                    </Text>
                                    <Text style={styles.text}>
                                        Data: {list.dt_cadastro || empty}
                                    </Text>
                                </Container>
                            </Container>
                        )
                    })}
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
    }
})

export default CollectList