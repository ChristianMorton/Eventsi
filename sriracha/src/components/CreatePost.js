import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import AppTextInput from "./AppTextInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEventPosts } from "../redux/actions/events";
import { db } from "../config/Firebase";
import * as firebase from "firebase";

const CreatePost = ({ idOfEvent, user }) => {
  const postCollection = db
    .collection("events")
    .doc(idOfEvent)
    .collection("posts");

  const [text, setText] = useState("");

  const getTimestamp = () => {
    return new firebase.firestore.Timestamp.fromDate(new Date(Date.now()));
  };

  const sendPost = () => {
    const message = {
      text: text,
      name: user.name,
      uid: user.uid,
      timestamp: getTimestamp(),
    };

    postCollection.add(message);
  };

  return (
    <View>
      <AppTextInput
        value={text}
        onChangeText={(changedText) => setText(changedText)}
        leftIcon="account"
        placeholder="Enter Post"
        autoCapitalize="none"
      />
      <Button title="Make post" onPress={sendPost} />
    </View>
  );
};

const styles = StyleSheet.create({});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getEventPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
