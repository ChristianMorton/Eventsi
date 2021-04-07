import React from "react";
import { storiesOf } from "@storybook/react-native";
import MapModal from "../../../src/components/MapModal";
import { withKnobs } from "@storybook/addon-knobs";
import { View, Dimensions } from "react-native";

storiesOf("Map Modal", module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      {story()}
    </View>
  ))
  .add("default", () => (
    <MapModal
      longitudeLatitude={{
        coords: { longitude: -0.16644879999999998, latitude: 51.4567171 },
      }}
      setLongitudeLatitude={(info) => console.log(info)}
      toggleModal={() => console.log("Modal Toggled")}
    />
  ))
  .add("with pre-determined geopoint", () => (
    <MapModal
      longitudeLatitude={{
        coords: { longitude: -0.16644879999999998, latitude: 51.4567171 },
      }}
      setLongitudeLatitude={(info) => console.log(info)}
      toggleModal={() => console.log("Modal Toggled")}
      preGeopoint={{ longitude: -0.16644879999999998, latitude: 51.4567171 }}
    />
  ));
