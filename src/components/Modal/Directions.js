import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, ScrollView } from 'react-native';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class DirectionsModal extends React.Component {
    state = {
    }

    render() {
        // console.log('steps', this.props.steps);
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    // alert('Local escolhido.');
                }}>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={[styles.contentContainer, styles.modal]}>
                        {this.props.steps.map((step,idx)=> {
                            // console.log('step', String(step.html_instructions))
                            // return <View><Text>{idx+1}.</Text>{ReactHtmlParser(step.html_instructions)}</View>;
                        })}
                    </ScrollView>
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
    contentContainer: {
        paddingVertical: 20
    }
});