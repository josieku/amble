import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Origin extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome to amble</Text>
                </View>
                <View style={styles.searchSection}>
                    <GooglePlacesAutocomplete
                        placeholder= "Where do you want to go today?"
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            // this.props.save(details.geometry.location, details.formatted_address);
                            // this.setState({text: details.formatted_address})
                            // console.log(details.geometry.location);
                        }}
                        
                        getDefaultValue={() => ""}
                        
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: this.props.googleKey,
                            language: 'en', // language of the results
                            types: ['address', 'establishment','geocode'] // default: 'geocode'
                        }}
                        
                        styles={{
                            textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderWidth: 0,
                                padding: -30
                            },
                            description: {
                            fontWeight: 'bold'
                            },
                        }}
                        
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food'
                        }}
                    
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity>
                        <Text>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    controls:{
        flexDirection: 'row',
        marginTop:40
    },
    searchSection:{
        margin: 50
    },
    header: {
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 20
    },
    headerText:{
        fontWeight: "bold",
        fontSize: 20
    },  
    container:{
        backgroundColor: "#d8d4a5",
        justifyContent: 'center',
    }
});