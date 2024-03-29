import React, { useCallback, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EventListPanel from "../components/EventListPanel";
import { getMyEvents } from "../redux/actions/events";
import "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ updateAuthState, events, getMyEvents }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      getMyEvents();
    })
  );

  useEffect(() => {
    getMyEvents();
  }, [refreshing]);

  const renderItem = ({ item }) => (
    <EventListPanel
      name={item.name}
      description={item.description}
      time={item.time.toDate()}
      eventInfo={item}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events.event}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
