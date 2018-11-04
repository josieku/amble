import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Origin from './Origin';

export default class Survey extends React.Component {
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
            <View style={styles.container}>
                <Origin/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});