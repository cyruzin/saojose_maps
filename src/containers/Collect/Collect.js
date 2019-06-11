import * as React from 'react'
import { StyleSheet } from 'react-native'
import { common } from '../../util/common'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Text, ButtonCard } from '../../components/UI'

class Collect extends React.Component {

    render() {

        return (
            <Container style={styles.container}>
                <ButtonCard
                    title='Coletar Ponto'
                    style={styles.card}
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
                    style={styles.card}
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
                    style={styles.card}
                    onPress={() => console.log('Listar Coletas')}>
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
    card: {
        marginBottom: 30
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
});

export default Collect