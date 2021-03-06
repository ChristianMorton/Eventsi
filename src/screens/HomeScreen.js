import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Button,
  FlatList,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen = ({ updateAuthState, events }) => {
  const renderItem = ({ item }) => <Item title={item.name} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events.event}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events,
  };
};

export default connect(mapStateToProps)(HomeScreen);
