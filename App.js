import React from 'react';
import Map from './src/components/Map/Map';
import { SafeAreaView, View } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Map/>
      </SafeAreaView>
    );
  }
}