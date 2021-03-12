import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapComponent from "./MapComponent";

const DetailsTab = ({
  id,
  RSVPTime,
  name,
  description,
  time,
  dressCode,
  Location,
  hasRSVP,
}) => {
  const [longitudeLatitude, setLongitudeLatitude] = useState(null);

  return (
    <View>
      <Text>Description: {description}</Text>
      {dressCode != "" ? <Text>{dressCode}</Text> : null}
      {hasRSVP ? <Text>RSVP time would be here</Text> : null}
      <MapComponent
        longitudeLatitude={longitudeLatitude}
        setLongitudeLatitude={setLongitudeLatitude}
        style={{
          map: {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
          },
        }}
        preGeopoint={Location}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailsTab;
