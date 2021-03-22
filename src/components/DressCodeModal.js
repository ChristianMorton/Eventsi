import React from 'react'
import {Text, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";



const DressCodeModal = ({events}) => {

    return(
        <SafeAreaView style={styles.container}>
                <Text>Dress code modal</Text>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
container: {
    marginTop: StatusBar.currentHeight || 0,
  },
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DressCodeModal);
