import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SectionList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const RSVPStatusPanel = ({ events, eventId }) => {
  const [DATA, setDATA] = useState([{data:[], title:"Going"},{data:[], title:"Maybe"},{data:[], title:"Invited"}, ]);

  const _reorderData = () => {
    const myArray = [];
    for (var i = 0; i < events.length; i++) {
      if (events[i].id === eventId) {
        myArray[0] = events[i];
      }
    }

    const keys = Object.keys(myArray[0].invited);
    const temp = [
      { title: "Going", data: [] },
      { title: "Maybe", data: [] },
      { title: "Invited", data: [] },
    ];
    for (var i = 0; i < Object.keys(myArray[0].invited).length; i++) {
      if (myArray[0].invited[keys[i]].status == "invited") {
        temp[2].data.push(myArray[0].invited[keys[i]].name);
      } else if (myArray[0].invited[keys[i]].status == "maybe") {
        temp[1].data.push(myArray[0].invited[keys[i]].name);
      } else if (myArray[0].invited[keys[i]].status == "going") {
        temp[0].data.push(myArray[0].invited[keys[i]].name);
      }
    }

    console.log(temp);
    setDATA(temp);
  };

  useEffect(() => {
    _reorderData();
  }, []);

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
      <Text>{}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      {DATA[0].data.length != 0? <View><Text style={styles.header}>Going</Text>{DATA[0].data.map((element, index) => {
        return <Text key={index}>{element}</Text>
      })}</View> : null}
      {DATA[1].data.length != 0 ? <View><Text style={styles.header}>Maybe</Text>{DATA[1].data.map((element, index) => {
        return <Text key={index}>{element}</Text>
      })}</View> : null}
      {DATA[2].data.length != 0 ? <View><Text style={styles.header}>Invited</Text>{DATA[2].data.map((element, index) => {
        return <Text key={index}>{element}</Text>
      })}</View> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{fontSize:20}
});

const mapStateToProps = (state) => {
  return {
    events: state.events.event,
  };
};

export default connect(mapStateToProps)(RSVPStatusPanel);
