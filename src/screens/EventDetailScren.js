import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import AppButton from "../components/AppButton";
import * as ImagePicker from "expo-image-picker";
import "firebase/storage";
import * as firebase from "firebase";
import { db } from "../config/Firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEventMedia } from "../redux/actions/events";
import GalleryComponent from "../components/GalleryComponent";
import EventsTabs from "../navigation/EventsTabs";

const EventDetailScreen = ({
  route,
  navigation,
  user,
  getEventMedia,
  events,
}) => {
  const { id, RSVPTime, name, description, time, dressCode } = route.params;
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [eventMedia, setEventMedia] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [eventMediaURI, setEventMediaURI] = useState([]);

  const chooseImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    console.log(result);
    //let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      await uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uuid = uuidv4() + ".jpg";
      var ref = firebase.storage().ref().child(uuid);
      const res = await db
        .collection("events")
        .doc(id)
        .collection("media")
        .add({
          description: "test desc",
          name: user.name,
          slug: uuid,
          user: user.uid,
        });
      return ref.put(blob);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.time}>
          Date: {time.getDate()}/{time.getMonth() + 1}/
          {time.getYear() < 2000 ? time.getYear() + 1900 : time.getYear()}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text>Dress code: {dressCode}</Text>
      </View>
      <AppButton title="upload images" onPress={chooseImage} />
      <View style={{ flex: 1 }}>
        <EventsTabs id={id} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fefefe",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  time: {
    fontSize: 22,
  },
  description: {
    fontSize: 18,
  },
  image: {
    flex: 1,
    maxWidth: Dimensions.get("window").width,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getEventMedia }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
