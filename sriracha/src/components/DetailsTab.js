import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import DetailsText from "./DetailsText";
import DressCodeModal from "./DressCodeModal";
import MapModal from "./MapModal";
import RSVPStatusPanel from "./RSVPStatusPanel";
import CircleShape from "./shapes/CircleShape";
import SquareShape from "./shapes/SquareShape";

const DetailsTab = ({
  id,
  RSVPTime,
  name,
  description,
  time,
  dressCode,
  Location,
  hasRSVP,
  navigation,
}) => {
  const [longitudeLatitude, setLongitudeLatitude] = useState(null);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [dressCodeModalVisible, setDressCodeModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <DetailsText
          icon="information"
          text={"Time of event: " + time.toString()}
        />
        <DetailsText icon="information" text={"Description: " + description} />
        {dressCode != "" ? (
          <TouchableHighlight
            onPress={() => setDressCodeModalVisible(!dressCodeModalVisible)}
          >
            <DetailsText icon="hanger" text={dressCode} />
          </TouchableHighlight>
        ) : null}
        {hasRSVP ? (
          <DetailsText
            icon="clock-time-four"
            text={"RSVP by: " + RSVPTime.toString()}
          />
        ) : null}
        <RSVPStatusPanel eventId={id} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={mapModalVisible}
        >
          <View style={{ backgroundColor: "#fff " }}>
            <MapModal
              longitudeLatitude={longitudeLatitude}
              setLongitudeLatitude={setLongitudeLatitude}
              navigation={navigation}
              preGeopoint={Location}
              toggleModal={() => {
                setMapModalVisible(!mapModalVisible);
              }}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={dressCodeModalVisible}
        >
          <View style={{ flex: 1 }}>
            <DressCodeModal id={id} dressCode={dressCode} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setDressCodeModalVisible(!dressCodeModalVisible);
              }}
            >
              <Text>Close Dress Code</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <TouchableHighlight
          style={{ ...styles.openButton }}
          onPress={() => {
            setMapModalVisible(!mapModalVisible);
          }}
        >
          <Text style={styles.textStyle}>Show Map</Text>
        </TouchableHighlight>
      </ScrollView>
      <CircleShape
        color="#A5BFBF"
        height={180}
        width={250}
        bottom={250}
        left={-100}
        zIndex={-1}
        opacity={0.7}
      />
      <SquareShape
        color="#77dd77"
        height={120}
        width={120}
        bottom={Dimensions.get("window").height * 0.2}
        left={Dimensions.get("window").width * 0.2}
        zIndex={-1}
        opacity={0.4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
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
    borderRadius: 0,
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
  circleShape: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#FF00FF",
    position: "absolute",
    left: 250,
    bottom: 250,
  },
});

export default DetailsTab;
