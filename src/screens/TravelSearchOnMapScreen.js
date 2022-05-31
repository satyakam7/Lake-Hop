/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import TopNavBar from '../components/TopNavBar';

class TravelSearchOnMapScreen extends Component {
  render() {
    const {boats} = this.props.route.params;
    let locations = [];
    for (let i = 0; i < boats.length; i++) {
      for (let j = 0; j < boats[i].locations.length; j++)
        if (
          boats[i].locations[j].lat !== null &&
          boats[i].locations[j].lng !== null
        )
          locations.push({
            lat: boats[i].locations[j].lat,
            lng: boats[i].locations[j].lng,
          });
    }
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Search on Map"
            onBack={() => this.props.navigation.navigate('TravelSearch')}
          />
          <View style={styles.flex}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.flex}
              // Middle US
              region={{
                latitude: 35,
                longitude: -97,
                latitudeDelta: 60,
                longitudeDelta: 60,
              }}>
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}
                />
              ))}
            </MapView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default TravelSearchOnMapScreen;
