import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AppTextInput from "./AppTextInput";
import * as Location from "expo-location";

const MapComponent = ({
  style,
  longitudeLatitude,
  setLongitudeLatitude,
  preGeopoint = null,
  navigation,
}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [arrayOfPossibleLocations, setArrayOfPossibleLocations] = useState(
    null
  ); // Here because we might use in future tbh

  const [searched, setSearched] = useState(false);
  const searchForLocation = async () => {
    Location.geocodeAsync(searchLocation).then((res) => {
      setArrayOfPossibleLocations(res);
      setLongitudeLatitude({
        coords: { longitude: res[0].longitude, latitude: res[0].latitude },
      });
      Location.reverseGeocodeAsync({
        longitude: res[0].longitude,
        latitude: res[0].latitude,
      }).then((res) => {
        setPostalAddress(res.postalCode);
        setSearched(true);
      });
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        alert("You must enable location");
        navigation.navigate("InitialLogin");
        return;
      }
      if (preGeopoint == null) {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLongitudeLatitude(location);
      }
    })();
  }, []);

  useEffect(() => {
    const searchGeopoint = async () => {
      if (preGeopoint != null) {
        setLongitudeLatitude({
          coords: {
            longitude: preGeopoint.longitude,
            latitude: preGeopoint.latitude,
          },
        });
        Location.reverseGeocodeAsync({
          longitude: preGeopoint.longitude,
          latitude: preGeopoint.latitude,
        })
          .then((res) => {
            var tempPostalAddress = "";
            if (res[0].name != null) {
              tempPostalAddress += res[0].name + " ";
            }
            if (res[0].district != null) {
              tempPostalAddress += res[0].district + " ";
            }
            if (res[0].street != null) {
              tempPostalAddress += res[0].street;
            }
            if (res[0].region != null) {
              tempPostalAddress += ", " + res[0].region;
            }
            if (res[0].postalCode != null) {
              tempPostalAddress += ", " + res[0].postalCode + " ";
            }

            setPostalAddress(tempPostalAddress);
            setSearched(true);
          })
          .catch((err) => alert(err));
      }
    };
    searchGeopoint();
  }, []);
  return (
    <View style={{ backgroundColor: "#f9e9d2" }}>
      {preGeopoint == null ? (
        <View style={styles.searchBarContainer}>
          <View style={{ flex: 9 }}>
            <AppTextInput
              value={searchLocation}
              onChangeText={(text) => setSearchLocation(text)}
              leftIcon="map-marker"
              placeholder="Search For Location"
              autoCapitalize="none"
              keyboardType="default"
              textContentType="none"
            />
            <Button
              style={{ flex: 1, color: "#9AB7D2" }}
              color={"#9AB7D2"}
              title="Search"
              onPress={searchForLocation}
            />
          </View>
        </View>
      ) : null}

      {longitudeLatitude ? (
        <MapView
          region={{
            latitude: longitudeLatitude.coords.latitude,
            longitude: longitudeLatitude.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={style.map}
        >
          {searched ? (
            <Marker
              index={0}
              coordinate={longitudeLatitude.coords}
              title={postalAddress}
              isPreselected={true}
            />
          ) : null}
        </MapView>
      ) : (
        <Text>Allow location permissions</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    flex: 10,
  },
});

export default MapComponent;
