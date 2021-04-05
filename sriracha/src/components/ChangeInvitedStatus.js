import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableHighlight,
} from "react-native";
import { changeStatus } from "../redux/actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const ChangeInvitedStatus = ({ currentStatus, idOfEvent, changeStatus }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const status = (changedStatus) => {
    changeStatus(idOfEvent, changedStatus);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Button title="going" onPress={() => status("going")} />
            <Button title="maybe" onPress={() => status("maybe")} />
            <Button title="not going" onPress={() => status("not going")} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight onPress={() => setModalVisible(!modalVisible)}>
        <Text>Current Status: {currentStatus}</Text>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeStatus }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    events: state.events.currentEventMedia,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeInvitedStatus);
