import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapViewDirections from '../../services/MapViewDirections';
import AutocompleteModal from '../Modal/AutocompleteModal';
import ExperienceModal from '../Modal/Experience';
import * as calculations from '../../Calculations';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyC6e1fU6y6ECP-j_N9KjWEzeq2qFyL1Dy0';

const pin1 = require('../../../assets/imgs/pin1.png');
const pin2 = require('../../../assets/imgs/pin2.png');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Mapa extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingRoute: false,
      origin: {},
      destination: {},
      coordinates: [],
      waypoints: [],
      experience: "Experience",
      destinationText: 'Destination',
      originText: 'Origin',
      modalOriginVisible: false,
      modalDestinationVisible: false,
      modalExperienceVisible: false,
      duration: '0 min',
      distance: 0,
      currentLocation: {},
      previousPath: [],
      finalRoute: false,
      errorMessage: null
    };

    this.mapView = null;
  }

  reset = () => {
    this.getLocationAsync();
    this.setState({
      loading: false,
      loadingRoute: false,
      finalRoute: false,
      origin: {},
      destination: {},
      coordinates: [],
      waypoints: [],
      experience: "Experience",
      destinationText: 'Destination',
      originText: 'Origin',
      modalOriginVisible: false,
      modalDestinationVisible: false,
      modalExperienceVisible: false,
      duration: '0 min',
      distance: 0,
    })
  }

  saveExperience = (experience) => {
    this.setState({ experience, modalExperienceVisible: false})
  }

  saveOrigin = (originParam, originText) => {
    const origin = {
      latitude: originParam.lat,
      longitude: originParam.lng,
    };

    const newCurrent = {
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({ 
      origin, 
      modalOriginVisible: false, 
      originText, 
      currentLocation: Object.assign(origin, newCurrent)
    });
  }

  goTo = (goToLocation, destinationText) => {
    const coordinates = [
      {
        latitude: this.state.origin.latitude,
        longitude: this.state.origin.longitude,
      },
      {
        latitude: goToLocation.lat,
        longitude: goToLocation.lng,
      },
    ]
    this.setState({ coordinates, modalDestinationVisible: false, destinationText });
  }

  setModalDestinationVisible = (visible) => {
    this.setState({ modalDestinationVisible: visible });
  }

  setModalOriginVisible = (visible) => {
    this.setState({ modalOriginVisible: visible });
  }

  setModalExperienceVisible = (visible) => {
    this.setState({ modalExperienceVisible: visible });
  }

  openEstimateDuration = () => {
    if (this.state.duration !== '0 min') {
      return (
        <View style={styles.boxContainer}>
          <View style={[styles.boxBubbleBottom, styles.box]}>
            <Text style={styles.textButtonLarge}>Estimated Time</Text>
            <Text style={styles.textButtonLargeValue}>{this.state.duration}</Text>
          </View>
        </View>
      );
    }
  }

  showCurrentLocationMarker = () => {
    if (this.state.duration === '0 min') {
      return (
        <MapView.Marker coordinate={this.state.currentLocation}
          image={pin1} />
      );
    }
  }

  componentWillMount = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Opa, não é possível recuperar o GPS do Emulador Android, tente em um aparelho!');
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Please enable location services!');
    } else {
      let data = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      await this.setState({ currentLocation, loading: true });
    }
  };

  renderRoute = () => {
    console.log('rendering');

    if (this.state.experience === "Fastest"){
      this.fastestRoute();
    }

    if (this.state.experience === "Most Scenic") {
      this.scenicRoute();
    };

    // if (this.experience === "Quietest"){

    // }

    // if (this.experience === "Safest"){

    // }

    if (this.state.experience === "Best Workout"){
      console.log('workout here');
      this.bestWorkout();
    }
  }

  fastestRoute = () => {
    this.setState({ waypoints: [], finalRoute: true, loadingRoute: false })
  }

  scenicRoute = async () => {
    let waypoints = await calculations.scenic(this.state.coordinates);
    this.setState({ waypoints: waypoints.slice(0, 22), finalRoute: true, loadingRoute: false });
  }

  bestWorkout = async () => {
    let waypoints = await calculations.workout(this.state.coordinates);
    this.setState({ waypoints: waypoints.slice(0, 22), finalRoute: true, loadingRoute: false})
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>

          <AutocompleteModal
            text="Origin"
            modalVisible={this.state.modalOriginVisible}
            setModalVisible={this.setModalOriginVisible}
            save={this.saveOrigin}
            googleKey={GOOGLE_MAPS_APIKEY}
            showCurrentLocationButton={true}
            currentLocation={this.state.currentLocation}
          />

          <AutocompleteModal
            text="Destination"
            modalVisible={this.state.modalDestinationVisible}
            setModalVisible={this.setModalDestinationVisible}
            save={this.goTo}
            googleKey={GOOGLE_MAPS_APIKEY}
            showCurrentLocationButton={false}
            currentLocation={this.state.currentLocation}
          />

          <ExperienceModal
            modalVisible={this.state.modalExperienceVisible}
            setModalVisible={this.setModalExperienceVisible}
            save={this.saveExperience}
          />

          <MapView
            initialRegion={this.state.currentLocation}
            region={this.state.currentLocation}
            style={styles.map}
            ref={c => this.mapView = c}
          // onPress={this.onMapPress}
          >
            {this.showCurrentLocationMarker()}

            {this.state.coordinates.map((coordinate, index) => {
              if (index === 1) {
                return (
                  <MapView.Marker image={pin2} ref={ref => this.marker1 = ref} key={`coordinate_${index}`} coordinate={coordinate} />
                )
              } else {
                return (
                  <MapView.Marker image={pin1} key={`coordinate_${index}`} coordinate={coordinate} />
                )
              }
            })}

            {(this.state.coordinates.length >=2 && this.state.experience!=="Experience" && !this.state.finalRoute) ? this.renderRoute() : null}

            {(this.state.finalRoute) && (
              <MapViewDirections
                origin={this.state.coordinates[0]}
                waypoints={this.state.waypoints}
                destination={this.state.coordinates[this.state.coordinates.length - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                mode='walking'
                strokeWidth={3}
                strokeColor="#007584"
                onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination} for ${this.state.experience}"`);
                }}
                onReady={(result) => {
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: parseInt((width / 20), 10),
                      bottom: parseInt((height / 20), 10),
                      left: parseInt((width / 20), 10),
                      top: parseInt((height / 20), 10)
                    }
                  });

                  {
                    const duration = Math.round(result.duration) + ' min';
                    const distance = result.distance;
                    this.setState({ duration, distance, previousPath: result.coordinates });
                  }

                }}
                onError={(errorMessage) => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}

          </MapView>

          <View style={styles.header}>
            <Text style={styles.textLogo}>Walk!</Text>
            <TouchableOpacity onPress={()=>this.reset()}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>

          {(!this.state.finalRoute) && (
            <View style={styles.searchContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.setModalOriginVisible(true)} style={[styles.bubbleTop, styles.button]}>
                  <MaterialCommunityIcons name="checkbox-blank" size={20} color="#848f4b" />
                  <Text style={styles.textButtonSearchAdress}>{this.state.originText}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.setModalDestinationVisible(true)} style={[styles.bubbleBottom, styles.button]}>
                  <MaterialCommunityIcons name="checkbox-blank" size={20} color="#848f4b" />
                  <Text style={styles.textButtonSearchAdress}>{this.state.destinationText}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.setModalExperienceVisible(true)} style={[styles.bubbleBottom, styles.button]}>
                  <MaterialCommunityIcons name="checkbox-blank" size={20} color="#848f4b" />
                  <Text style={styles.textButtonSearchAdress}>{this.state.experience}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {(this.state.finalRoute) && (
              <View style={styles.buttonContainer}>
                <View  style={[styles.bubbleTop, styles.button]}>
                  <Text style={styles.textButtonSearchAdress}>
                    {this.state.originText.split(",")[0]} to {this.state.destinationText.split(",")[0]}
                  </Text>
                  <MaterialCommunityIcons name="chevron-double-right" size={20} color="#848f4b" />
                </View>
              </View>
          )}

          {
            this.openEstimateDuration()
          }

        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubbleTop: {
    flex: 1,
    backgroundColor: '#e3e4e8',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomColor: '#a0acb2',
    borderBottomWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  bubbleBottom: {
    flex: 1,
    backgroundColor: '#e3e4e8',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomColor: '#a0acb2',
    borderBottomWidth: 1,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textButtonLarge: {
    flex: 1,
    margin: 10,
    fontSize: 16,
    color: 'white'
  },
  textButtonLargeValue: {
    flex: 1,
    margin: 10,
    fontSize: 20,
    color: '#848f4b',
    fontWeight: "bold"
  },
  textButtonSearchAdress: {
    flex: 1,
    margin: 2,
    fontSize: 14,
    color: '#848f4b',
    fontWeight: "bold"
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  boxContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  boxBubbleBottom: {
    flex: 1,
    backgroundColor: '#a0acb2',
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  box: {
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
  },
  searchContainer:{
    justifyContent: 'flex-end',
    width: 300
  },
  textLogo: {
    fontWeight: 'bold',
    fontSize: 24,
  }
});

export default Mapa;