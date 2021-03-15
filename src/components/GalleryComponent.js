import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import "firebase/storage";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEventMedia } from "../redux/actions/events";
import { useSelector } from "react-redux";

const GalleryComponent = ({ id, getEventMedia, events }) => {
  const [eventMedia, setEventMedia] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //getEventMedia(id);
    // setEventMedia(events.currentEventMedia);
    //getURI();
    //getEventMediaFunction();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const storage = firebase.storage();

  const renderItem = (item) => {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width / 3,
          height: Dimensions.get("window").width / 3,
        }}
      >
        <Image
          source={{
            uri: item.item.url,
          }}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
    );
  };

  useEffect(() => {
    getEventMedia(id);
    wait(2000);
    onRefresh();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={3}
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        extraData={events.currentEventMedia}
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
    events: state.events.currentEventMedia,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryComponent);
