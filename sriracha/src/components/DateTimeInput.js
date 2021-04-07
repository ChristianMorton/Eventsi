import React, { useState } from "react";
import {
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DateTimeInput = ({ setDate, date, isDateOfEvent, isEndDate = false }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const _dateInputString = () => {
    if (isDateOfEvent) {
      return "Starting Date ";
    }
    return isEndDate ? "Ending Date" : "Reply by Date";
  };

  const _timeInputString = () => {
    if (isDateOfEvent) {
      return "Starting Time ";
    }
    return isEndDate ? "Ending Time" : "Reply by Time";
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.pickerButtonsView}>
          <View style={styles.pickerView}>
            <Text>{_dateInputString()}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={showDatepicker}
            >
              <Text style={styles.dateInput}>
                {date.getDate()}/{date.getMonth() + 1}/
                {date.getYear() < 2000 ? date.getYear() + 1900 : date.getYear()}
              </Text>
              <MaterialCommunityIcons
                name={"calendar"}
                size={25}
                color="#F69970"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.pickerView}>
            <Text>{_timeInputString()}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={showTimepicker}
            >
              <Text style={styles.dateInput}>
                {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}
                :
                {date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes()}
              </Text>
              <MaterialCommunityIcons
                name={"clock"}
                size={25}
                color="#F69970"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {show && (
          <DateTimePicker
            style={{ flex: 1, alignSelf: "stretch" }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  pickerButtonsView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  pickerView: {
    width: "50%",
    alignItems: "center",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  touchableOpacity: {
    marginVertical: 10,
    borderRadius: 14,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 20,
    width: "80%",
    shadowColor: "rgba(0,0,0, .2)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.3, // IOS
    shadowRadius: 4, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
    flexDirection: "row",
  },
});

export default DateTimeInput;
