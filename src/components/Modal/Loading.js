import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

export default class ExperienceModal extends React.Component {
    state = {
        experience: "None",
        error: false,
    }

    set(experience){
        this.setState({experience})
    }

    done(){
        if (this.state.experience!=='None') {
            this.props.save(this.state.experience);
            this.setState({ error: false })
        }
        else this.setState({ error: true })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    // alert('Local escolhido.');
                }}>
                <View style={styles.modal}>
                    <ActivityIndicator size="large"/>
                    <Text style={{marginTop: 5, color: 'white'}}>Preparing the best route for you...</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});