import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  StatusBar,
} from "react-native";
import "firebase/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEventPosts } from "../redux/actions/events";
import CreatePost from "./CreatePost";

const PostsTab = ({ getEventPosts, id, events }) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.item.name}</Text>
        <Text>{item.item.text}</Text>
      </View>
    );
  };

  useEffect(() => {
    getEventPosts(id);
    onRefresh();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CreatePost idOfEvent={id} />

      <FlatList
        numColumns={1}
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fff",
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
  return bindActionCreators({ getEventPosts }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    events: state.events.currentEventPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsTab);
