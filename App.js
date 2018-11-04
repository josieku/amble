import React from 'react';
import Map from './src/components/Map/Map';
import { SafeAreaView, View } from 'react-native';
import Survey from './src/components/Survey/Survey';

export default class App extends React.Component {
  saveData = (data) => {
    this.setState({ data, survey: false })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Map/>
      </SafeAreaView>
    );
  }
}