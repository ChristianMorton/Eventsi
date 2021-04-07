import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AppTextInput from "./AppTextInput";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const _formatLocationDataString = (dataArray) => {
  var tempPostalAddress = "";
  if (dataArray[0].name != null) {
    tempPostalAddress += dataArray[0].name + " ";
  }
  if (dataArray[0].district != null) {
    tempPostalAddress += dataArray[0].district + " ";
  }
  if (dataArray[0].street != null) {
    tempPostalAddress += dataArray[0].street;
  }
  if (dataArray[0].region != null) {
    tempPostalAddress += ", " + dataArray[0].region;
  }
  if (dataArray[0].postalCode != null) {
    tempPostalAddress += ", " + dataArray[0].postalCode + " ";
  }
  return tempPostalAddress;
};

const MapModal = ({
  navigation,
  toggleModal,
  longitudeLatitude,
  setLongitudeLatitude,
  setSearchedLocation = null,
  preGeopoint = null,
}) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [postalAddress, setPostalAddress] = useState("");

  const [searched, setSearched] = useState(false);
  const searchForLocation = async () => {
    Location.geocodeAsync(searchLocation)
      .then((res) => {
        console.log(res);
        setLongitudeLatitude({
          coords: { longitude: res[0].longitude, latitude: res[0].latitude },
        });
        Location.reverseGeocodeAsync({
          longitude: res[0].longitude,
          latitude: res[0].latitude,
        }).then((rev) => {
          const postAddress = _formatLocationDataString(rev);
          setPostalAddress(postAddress);
          if (setSearchedLocation != null) {
            setSearchedLocation(postAddress);
          }
          setSearched(true);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status != "granted") {
        alert("You must enable location");
        _closeMap();
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
            setPostalAddress(_formatLocationDataString(res));
            setSearched(true);
          })
          .catch((err) => alert(err));
      }
    };
    searchGeopoint();
  }, []);

  const addMarker = () => {
    return searched ? (
      <Marker
        index={0}
        coordinate={longitudeLatitude.coords}
        title={postalAddress}
        isPreselected={false}
      />
    ) : null;
  };

  const _closeMap = () => {
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {longitudeLatitude ? (
        <MapView
          region={{
            latitude: longitudeLatitude.coords.latitude,
            longitude: longitudeLatitude.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {addMarker()}
        </MapView>
      ) : (
        <Text>Allow location permissions</Text>
      )}
      <Pressable onPress={_closeMap} style={styles.pressable}>
        <MaterialCommunityIcons
          name={"arrow-left"}
          size={40}
          color="#6e6869"
          style={styles.icon}
        />
      </Pressable>

      {preGeopoint == null ? (
        <View style={styles.searchBarContainer}>
          <AppTextInput
            value={searchLocation}
            onChangeText={(text) => setSearchLocation(text)}
            leftIcon="magnify"
            placeholder="Search For Location"
            autoCapitalize="none"
            keyboardType="default"
            textContentType="none"
            onSubmitEditing={() => searchForLocation()}
            multiline={false}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    //width: Dimensions.get("window").width,
    //height: Dimensions.get("window").height,
  },
  searchBarContainer: {
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width,
    top: 50,
  },
  pressable: {
    position: "absolute",
    top: 10,
    left: "5%",
  },
  icon: {},
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapModal;
