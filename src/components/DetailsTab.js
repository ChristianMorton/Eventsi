import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  ScrollView
} from "react-native";
import DetailsText from "./DetailsText";
import DressCodeModal from "./DressCodeModal";
import MapComponent from "./MapComponent";
import RSVPStatusPanel from "./RSVPStatusPanel";

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
    <View>
      <ScrollView>
      <DetailsText
        icon="information"
        text={"Time of event: " + time.toString()}
      />
      <DetailsText icon="information" text={"Description: " + description} />
      {dressCode != "" ? (<TouchableHighlight onPress={()=>setDressCodeModalVisible(!dressCodeModalVisible)}><DetailsText icon="hanger" text={dressCode} /></TouchableHighlight>) : null}
      {hasRSVP ? (
        <DetailsText
          icon="clock-time-four"
          text={"RSVP by: " + RSVPTime.toString()}
        />
      ) : null}
      <RSVPStatusPanel eventId={id} />
      <Modal animationType="slide" transparent={false} visible={mapModalVisible}>
        <View style={{backgroundColor:"#fff "}}>
          <MapComponent
            longitudeLatitude={longitudeLatitude}
            setLongitudeLatitude={setLongitudeLatitude}
            style={{
              map: {
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height - 70,
              },
            }}
            navigation={navigation}
            preGeopoint={Location}
          />
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setMapModalVisible(!mapModalVisible);
            }}
          >
            <Text style={styles.textStyle}>Hide Map</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={false} visible={dressCodeModalVisible}>
        <View style={{flex:1}}>
        <DressCodeModal/>
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
        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
        onPress={() => {
          setMapModalVisible(!mapModalVisible);
        }}
      >
        <Text style={styles.textStyle}>Show Map</Text>
      </TouchableHighlight>
      </ScrollView>
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
});

export default DetailsTab;
