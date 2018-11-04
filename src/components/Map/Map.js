import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import MapViewDirections from '../../services/MapViewDirections';
import AutocompleteModal from '../Modal/AutocompleteModal';
import ExperienceModal from '../Modal/Experience';
import LoadingModal from '../Modal/Loading';
import DirectionsModal from '../Modal/Directions';

import * as calculations from '../../Calculations';
import Spinner from 'react-native-loading-spinner-overlay';

const { width, height } = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyC6e1fU6y6ECP-j_N9KjWEzeq2qFyL1Dy0';

const pin1 = require('../../../assets/imgs/green_arrow.png');
const pin2 = require('../../../assets/imgs/green_pin.png');
const pin3 = require('../../../assets/imgs/pin2.png')

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingRoute: false,
      seeDirections: false,
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
      steps: [],
      currentLocation: {},
      previousPath: [],
      finalRoute: false,
      errorMessage: null
    };

    this.mapView = null;
  }

  componentWillMount = () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {	
      Alert.alert('Opa, não é possível recuperar o GPS do Emulador Android, tente em um aparelho!');	
    } else {	
      this.getLocationAsync();	
    }
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

  showCurrentLocationMarker = () => {
    if (this.state.duration === '0 min') {
      return (
        <MapView.Marker coordinate={this.state.currentLocation}
          image={pin1} />
      );
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
    if (this.state.experience === "Fastest") this.fastestRoute();

    if (this.state.experience === "Most Scenic") this.scenicRoute();

    /** to be implemented **/

    // if (this.experience === "Quietest"){

    // }

    // if (this.experience === "Safest"){

    // }
    /** **/

    if (this.state.experience === "Best Workout") this.bestWorkout();
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

  onClickOrigin = () => {
    this.setModalOriginVisible(true);
    this.setState({ finalRoute: false })
  }

  onClickDestination = () => {
    this.setModalDestinationVisible(true);
    this.setState({ finalRoute: false })
  }

  onClickExperience = () => {
    this.setModalExperienceVisible(true);
    this.setState({ finalRoute: false })
  }
  
  search = () => {
    this.setState({
      loadingRoute: true
    })
    this.renderRoute();
  }

  seeDirections = (visible) => {
    this.setState({seeDirections: visible})
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

          <LoadingModal
            modalVisible={this.state.loadingRoute}
          />

          <DirectionsModal
            modalVisible={this.state.seeDirections}
            setModalVisible={this.seeDirections}
            steps={this.state.steps}
          />

          <MapView
            initialRegion={this.state.currentLocation}
            region={this.state.currentLocation}
            style={styles.map}
            ref={c => this.mapView = c}
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

            {this.state.finalRoute 
              ? this.state.waypoints.forEach((p,i) => <MapView.Marker image={pin3} key={`markers-${i}`} coordinate={p}/>)
              : null}

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
                    const steps = result.steps;
                    const previousPath = result.coordinates;
                    this.setState({ duration, distance, previousPath, steps });
                  }

                }}
                onError={(errorMessage) => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}

          </MapView>

          <View style={styles.searchContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.onClickOrigin} style={[styles.bubble, styles.button]}>
                <MaterialCommunityIcons name="source-commit-start" size={25} color="black" />
                <Text style={styles.textButtonSearchAdress}>{this.state.originText}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.onClickDestination} style={[styles.bubble, styles.button]}>
                <MaterialCommunityIcons name="source-commit-end" size={25} color="black" />
                <Text style={styles.textButtonSearchAdress}>{this.state.destinationText}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer]}>
              <TouchableOpacity onPress={this.onClickExperience} style={[styles.bubble, styles.experienceButton]}>
                <MaterialCommunityIcons name="star" size={20} color="black" />
                <Text style={styles.textButtonSearchAdress}>{
                  this.state.experience==="Experience" 
                    ? "Choose your walking experience!"
                    : this.state.experience}
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchButton} onPress={this.search}>
                <View style={styles.searchLogo}>
                  <FontAwesome name="search" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.finalRoute
            ? <View style={[styles.directionsContainer]}>
                <TouchableOpacity onPress={()=>this.seeDirections(true)}>
                  <FontAwesome name="play" size={75} color="black" />
                </TouchableOpacity>
                <Text style={{fontWeight: "bold"}}>{this.state.duration}</Text>
              </View>
            : null
          }

          <View style={[styles.logoContainer]}>
            <Text style={styles.textLogo}>amble</Text>
          </View>

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    borderBottomColor: '#e3e4e8',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderRadius: 3
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  experienceButton:{
    flex:7,
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
    fontSize: 15,
    color: '#a0acb2',
    // fontWeight: "bold"
  },
  textButtonSmallValue:{
    flex: 1,
    margin: 5,
    alignItems: 'center',
    fontSize: 10,
    color: "white",
    fontWeight: "bold"
  },  
  textButtonSearchAdress: {
    flex: 1,
    margin: 2,
    fontSize: 14,
    color: '#a0acb2',
    // fontWeight: "bold"
  },
  buttonContainer: {
    height: 45,
    width: 355,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  boxContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  boxBubble: {
    flex: 1,
    backgroundColor: '#a0acb2',
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5
  },
  logoContainer:{
    width: 80,
    position: 'absolute',
    left: 20,
    top: 765
    // marginLeft:-250,
    // marginTop: 585,
  },
  directionsContainer:{
    width: 80,
    position: 'absolute',
    right: 15,
    top: 700,
    alignItems: 'center',
    justifyContent: 'center'
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
    marginTop: 50,
  },
  searchContainer:{
    justifyContent: 'flex-end',
    width: 350,
    marginTop: 20
  },
  searchLogo:{
    backgroundColor: 'white',
    borderRadius: 3,
    marginLeft:-10,
    padding: 12
  },
  searchButton:{
    alignItems:'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10
  },
  textLogo: {
    fontWeight: 'bold',
    fontSize: 24,
  }
});

export default Map;