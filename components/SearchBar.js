// SearchBar.js
import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";
import { Feather, Entypo } from 'react-native-vector-icons';

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {props.clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
          }}/>
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {props.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom:15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    // width: "100%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    // width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    alignItems: "center",

    shadowOffset: {width: 0, height: 10},
    shadowColor: '#d9dbda',
    shadowOpacity: 0.5,
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",

    shadowOffset: {width: 0, height: 1},
    shadowColor: '#d9dbda',
    shadowOpacity: 0.2,
elevation: 1,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});