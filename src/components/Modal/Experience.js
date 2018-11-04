import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal } from 'react-native';

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
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.headerText} >Optimize your walking experience,</Text>
                            <Text style={styles.headerText} > choose one below: </Text>
                        </View>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => this.set('Fastest')} style={styles.button}>
                                <Text style={styles.buttonText}>Fast</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.set('Most Scenic')} style={styles.button}>
                                <Text style={styles.buttonText}>Scenic</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => this.set('Safest')} style={styles.button}>
                                <Text style={styles.buttonText}>Safe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.set('Quietest')} style={styles.button}>
                                <Text style={styles.buttonText}>Quiet</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.options}>
                            <TouchableOpacity onPress={() => this.set('Best Workout')} style={styles.button}>
                                <Text style={styles.buttonText}>Best Workout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.choose}>
                            <TouchableOpacity disabled style={styles.chosenContainer}> 
                                <Text>Chosen: </Text><Text style={{fontSize: 20}}>{this.state.experience}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.done()} style={styles.doneButton}>
                                <Text>Done</Text>
                            </TouchableOpacity>
                        </View>

                        {this.state.error 
                            ?  <View><Text style={{color: 'red'}}>Please choose an experience.</Text></View>
                            : null}
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        height: 750,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 10,
        backgroundColor: '#d1d7ad',
        borderRadius: 5,
        padding: 14,
    },
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    doneButton: {
        margin: 10,
        padding: 10,
        backgroundColor: '#a0acb2',
        borderRadius: 5,
        alignItems:'center',
        flex: 2
    },
    chosenContainer:{
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        alignItems: 'center',
        flex: 2
    },
    buttonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17
    },
    textCloseModal: {
        color: 'red'
    },
    headerText:{
        fontSize: 20
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems:'center',
        marginBottom: 20,
    },
    options: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    choose: {
        flexDirection: 'row'
    }
});