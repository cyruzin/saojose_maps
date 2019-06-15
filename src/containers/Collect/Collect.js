import React from 'react'
import { StyleSheet } from 'react-native'
import { common } from '../../util/common'
import { httpFetch } from '../../util/request'
import { routeFix } from '../../util/helpers'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Text, ButtonCard } from '../../components/UI'

class Collect extends React.Component {

    render () {
        return (
            <Container style={styles.container}>
                <ButtonCard
                    title='Coletar Ponto'
                    onPress={() => console.log('Coletar Ponto')}>
                    <Container style={styles.cardContent}>
                        <Icon
                            name='map-pin'
                            size={30}
                            color={common.colors.white}
                            style={styles.icon} />
                        <Text style={styles.text}>Coletar Ponto</Text>
                    </Container>
                </ButtonCard>

                <ButtonCard
                    title='Coletar Área'
                    onPress={() => console.log('Coletar Área')}>
                    <Container style={styles.cardContent}>
                        <Icon
                            name='street-view'
                            size={30}
                            color={common.colors.white}
                            style={styles.icon} />
                        <Text style={styles.text}>Coletar Área</Text>
                    </Container>
                </ButtonCard >

                <ButtonCard
                    title='Listar Coletas'
                    onPress={() => routeFix('collectList')}>
                    <Container style={styles.cardContent}>
                        <Icon
                            name='list'
                            size={30}
                            color={common.colors.white}
                            style={styles.icon} />
                        <Text style={styles.text}>Listar Coletas</Text>
                    </Container>
                </ButtonCard>
            </Container >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: common.colors.dark,
        justifyContent: 'space-around'
    },
    cardContent: {
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15,
        color: common.colors.white,
        fontWeight: 'bold'
    },
    icon: {
        textAlign: 'center'
    }
})

export default Collect