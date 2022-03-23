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
          placeholder={props.searchPlaceHolder?props.searchPlaceHolder:"search"}
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
        <View >
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
    shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,
    shadowOffset: {width: 10, height: 10},borderRadius:10
    // width: "100%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    // width: "100%",
    // backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
    shadowOffset: {width: 0, height: 10},
    shadowColor: '#d9dbda',
    shadowOpacity: 0.2,
    borderRadius:10,
  },
  searchBar__clicked: {
    padding: 14,
    flexDirection: "row",
    alignItems:'center',
    alignSelf:'center',
    width: "70%",
    // backgroundColor: "#FFFFFF",
    // borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",

    // shadowOffset: {width: 0, height: 1},
    // shadowColor: '#d9dbda',
    shadowOpacity: 0.2,
// elevation: 1,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: "90%",
  },
});