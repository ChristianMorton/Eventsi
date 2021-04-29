import React, { useCallback, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
  View,
  Text,
  SectionList,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMyEvents } from "../redux/actions/events";
import "firebase/firestore";
import UpcomingEventPanel from "../components/UpcomingEventPanel";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ updateAuthState, events, getMyEvents }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [sectionListData, setSectionListData] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const _sortEventsToArray = () => {
    if (events.event) {
      var tempArray = [];
      events.event.forEach((element) => {
        tempArray.push({
          month: element.time
            .toDate()
            .toLocaleDateString([], { month: "short" }),
          data: [element],
        });

        setSectionListData(tempArray);
      });
    }
  };

  useEffect(() => {
    getMyEvents();
    _sortEventsToArray();
    console.log(sectionListData);
  }, [refreshing]);

  const RenderItem = ({ item }) => {
    console.log(item);
    return (
      <View>
        <UpcomingEventPanel eventInfo={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionListData}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { month } }) => <Text>{month}</Text>}
        initialNumToRender={3}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMyEvents }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
