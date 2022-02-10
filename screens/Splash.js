import React, { Component } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,
} from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

import Logo from "../assets/logo.png";

// import SwipeGestureComponents from "../components/SwipeGestureComponents";

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    // backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  StatusBar: {
    color: "white",
  },
});

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.gotToNextScreen();
    }, 2000);
  }

  

  gotToNextScreen = () => {
    return this.props.navigation.navigate("Start");

    // store.dispatch({
    //   type: "SHOW_SPLASH_SCREEN",
    //   payload: false,
    // });
  };

  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };
  render() {
    return (
      <View
        style={{ flex: 1 }}
      >
        <View
          style={styles.container}
        
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={styles.container.backgroundColor}
          />
          <Image resizeMode="stretch"   source={Logo} />
        </View>
      </View>
    );
  }
}
