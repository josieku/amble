import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class ExperienceModal extends React.Component {
    state = {
        experience: ""
    }

    set(experience){
        this.setState({experience})
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
                    <View style={styles.modalHeader}>
                        <Text>{this.props.text}</Text>
                        <TouchableOpacity onPress={() => this.props.setModalVisible(false)}>
                            <Text style={styles.textCloseModal}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.set('Fastest')}>
                            <Text>Fastest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.set('Most Scenic')}>
                            <Text>Scenic</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.set('Safest')}>
                            <Text>Safest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.set('Quietest')}>
                            <Text>Quietest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.set('Best Workout')}>
                            <Text>Best Workout</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.save(this.state.experience)}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    textCloseModal: {
        color: 'red'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});