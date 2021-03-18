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
  const [DATA, setDATA] = useState([]);

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
    </View>
  );

  return (
    <SafeAreaView>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    events: state.events.event,
  };
};

export default connect(mapStateToProps)(RSVPStatusPanel);
