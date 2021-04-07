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
      return "Start date of event";
    }
    return isEndDate ? "End date" : "ReplyByDate";
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={showDatepicker}
          >
            <Text style={styles.dateInput}>
              {_dateInputString()} :{"  "}
              {date.getDate()}/{date.getMonth() + 1}/
              {date.getYear() < 2000 ? date.getYear() + 1900 : date.getYear()}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={showTimepicker}
          >
            <Text style={styles.dateInput}>
              {_dateInputString()}:{"  "}
              {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:
              {date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()}
            </Text>
          </TouchableOpacity>
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#f9e9d2",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  touchableOpacity: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "80%",
    backgroundColor: "#9AB7D2",
  },
});

export default DateTimeInput;
