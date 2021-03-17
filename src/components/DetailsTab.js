import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
} from "react-native";
import DetailsText from "./DetailsText";
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
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <DetailsText
        icon="information"
        text={"Time of event: " + time.toString()}
      />
      <DetailsText icon="information" text={"Description: " + description} />
      {dressCode != "" ? <DetailsText icon="hanger" text={dressCode} /> : null}
      {hasRSVP ? (
        <DetailsText
          icon="clock-time-four"
          text={"RSVP by: " + RSVPTime.toString()}
        />
      ) : null}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View>
          <MapComponent
            longitudeLatitude={longitudeLatitude}
            setLongitudeLatitude={setLongitudeLatitude}
            style={{
              map: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height - 70,
              },
            }}
            preGeopoint={Location}
          />
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Hide Map</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <TouchableHighlight
        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textStyle}>Show Map</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DetailsTab;
