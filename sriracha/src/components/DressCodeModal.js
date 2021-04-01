import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as WebBrowser from "expo-web-browser";

const DressCodeModal = ({ events, id, dressCode }) => {
  const [arrayOfLinks, setArrayOfLinks] = useState([]);
  const _handlePressButtonAsync = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  useEffect(() => {
    const temp = events.find((el) => el.id == id);
    console.log(temp.dressCodeExamples);
    if (temp.dressCodeExamples) {
      setArrayOfLinks(temp.dressCodeExamples);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Dress code: {dressCode}</Text>
      {arrayOfLinks.length != 0
        ? arrayOfLinks.map((element, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  _handlePressButtonAsync(element);
                }}
              >
                <Text>{element}</Text>
              </TouchableHighlight>
            );
          })
        : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = (state) => {
  return {
    events: state.events.event,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DressCodeModal);
