import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { db } from "../config/Firebase";
import { connect } from "react-redux";
import * as firebase from "firebase";

const ChatTab = ({ id, currentuser }) => {
  const [messages, setMessages] = useState([]);

  const chatCollection = db.collection("events").doc(id).collection("chat");

  useEffect(() => {
    const unsub = chatCollection
      .orderBy("timestamp")
      .limit(20)
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("added data");
            const { name, text, timestamp, user } = change.doc.data();
            const { id: _id } = change.doc;
            const messageToPush = {
              _id,
              name,
              text,
              timestamp: timestamp.toDate(),
              user,
            };
            const temp = messages;
            temp.unshift(messageToPush);
            setMessages(temp);
          }
          if (change.type === "modified") {
            console.log("Modified message: ", change.doc.data());
            // This is equivalent to child_changed
          }
          if (change.type === "removed") {
            console.log("Removed message: ", change.doc.data());
            // This is equivalent to child_removed
          }
        });
      });
    return () => unsub();
  }, []);

  const getTimestamp = () => {
    return new firebase.firestore.Timestamp.fromDate(new Date(Date.now()));
  };

  const sendMessage = (messages) => {
    for (let value of messages) {
      const { text, user } = value;
      const { _id } = user;
      const message = {
        text,
        name: user.name,
        uid: _id,
        user,
        timestamp: getTimestamp(),
      };

      chatCollection.add(message);
    }
  };

  const user = () => {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: currentuser.name,
      _id: firebase.auth().currentUser.uid,
    };
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={sendMessage}
      user={user()}
      scrollToBottom={true}
      style={{ backgroundColor: "#f9e9d2" }}
    />
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    currentuser: state.user,
  };
};

export default connect(mapStateToProps)(ChatTab);
