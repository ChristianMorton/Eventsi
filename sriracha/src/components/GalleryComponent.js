import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import "firebase/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEventMedia } from "../redux/actions/events";
import ImageButton from "./ImageButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const GalleryComponent = ({ id, getEventMedia, events, chooseImage }) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getEventMedia(id);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: Dimensions.get("window").width / 3,
          maxHeight: Dimensions.get("window").width / 3,
          width: Dimensions.get("window").width / 3,
          maxWidth: Dimensions.get("window").width / 3,
        }}
      >
        <Image
          source={{
            uri: item.item.url,
          }}
          style={styles.image}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getEventMedia(id);
    onRefresh();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        numColumns={3}
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + item}
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <ImageButton style={styles.button} onPress={chooseImage} icon="camera" />
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
    height: Dimensions.get("window").width / 3,
    maxHeight: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width / 3,
    maxWidth: Dimensions.get("window").width / 3,
    overflow: "visible",
  },
  button: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  flatList: {
    backgroundColor: "#fff",
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
