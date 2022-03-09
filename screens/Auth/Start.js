import React, { Component,Platform } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  StatusBar,
} from "react-native";

// import Logo from "../assets/shago1.png";

import commission from "../../assets/commission.png";

import shop from "../../assets/shop1.png";

import investment from "../../assets/Investment.png";

const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../../components/GreenButton";


// import SwipeGestureComponents from "../components/SwipeGestureComponents";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft:80,
    paddingRight:80,
    paddingBottom:40,
  },

  logoWrapper: {
    // marginTop:30
  },

  displayIconWrapper: {
    //  marginTop:100
    alignSelf: "center",
  },

  lineWrapper: {
    // marginTop:40,

    flexDirection: "row",
    justifyContent: "center",
  },

  line: {
    width: 47,
    height: 20,
    opacity: 0.5,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
    marginLeft: 20,
  },
  circle: {
    width: 12,
    height: 12,
    marginLeft:10,
    borderRadius: 100 / 2,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
  },
  square:{
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
    opacity: 0.5,
    height: 10,//Dimensions.get('window').height * 0.1,
    width: 47,//Dimensions.get('window').height * 0.1,
    borderRadius: Math.round((Dimensions.get('window').height + Dimensions.get('window').width) / 2)
},

  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  IconTextWrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  IconText: {
    width: 198,
    // height: 57,
    // fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "normal",
    // lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    color: "#333333",
    fontStyle: "normal",
  },
});
const win = Dimensions.get('window');
const DisplayAds = ({ Icon, text }) => {
  return (
    <View>
      <View style={styles.displayIconWrapper}>
        <Image source={Ion} />
      </View>
      <View style={styles.IconTextWrapper}>
        <Text style={styles.IconText}>{text}</Text>
      </View>
    </View>
  );
};

export default class Start extends Component {
  constructor() {
    super();

    this.state = {
      Ads: [
        {
          icon: shop,
          title:"GTPS e-Shops",
          text: "This provide you access to our Online e-shop platform where you can display/find your Greenlife Products, other goods and services that you have to offer or have been looking for to buy.",
        },

        {
          icon: commission,
          title:"Commission",
          text: "Earn unlimited commission on all your referrals to join GTPS platform. On this plan with you and just 2 persons you refer can hit target of making 3m within 10 weeks of your joining.",
        },
        {
            icon: investment,
            title:"Investment",
            text: "As a GTPS member, you got the opportunity to invest in our Greenlife Herbal Products, a multinational group of companies distributing herbal medicine & other commodities.",
          },

      ],

      currentAdsPosition: 0,
    };
  }

  slideAds = (direction = "right") => {
    let adsLength = this.state.Ads.length - 1;
    let currentAdsPosition = this.state.currentAdsPosition;

    if (direction == "right") {
      if (currentAdsPosition < adsLength) {
        this.setState({ currentAdsPosition: currentAdsPosition + 1 });
      } else {
        this.setState({ currentAdsPosition: 0 });
      }
    } else {
      if (currentAdsPosition > 0) {
        this.setState({ currentAdsPosition: currentAdsPosition - 1 });
      } else {
        this.setState({ currentAdsPosition: adsLength });
      }
    }
  };

  backAction = () => {
    if (!this.props.navigation.isFocused()) {
      // let routeName = this.props.route.name;
      return false;
    }

    Alert.alert("Exit App", "Are you sure you want to exit this App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );

    this._interval = setInterval(() => this.slideAds(), 2000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    clearInterval(this._interval);
  }

  onSwipePerformed = (action) => {
    switch (action) {
      case "left": {
        this.slideAds(action);
        break;
      }
      case "right": {
        this.slideAds(action);
        break;
      }
      case "up": {
        console.log("up Swipe performed");
        break;
      }
      case "down": {
        console.log("down Swipe performed");
        break;
      }
      default: {
        console.log("Undeteceted action");
      }
    }
  };

  render() {
    let { currentAdsPosition, Ads } = this.state;

    return (
      <View style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor={null} />
        <View style = {{width:300}}>
          {/* <SwipeGestureComponents onSwipePerformed={this.onSwipePerformed}> */}
          <View style={styles.displayIconWrapper}>
            <Image resizeMode="stretch" style={{width: win.width/2,height: win.width/2,resizeMode: "contain",alignSelf: "center",}}
             source={Ads[currentAdsPosition].icon} />
          </View>
          <View style={styles.IconTextWrapper}>
            <Text style={styles.IconText}>{Ads[currentAdsPosition].title} </Text>
            <Text>{Ads[currentAdsPosition].text} </Text>
          </View>
          {/* </SwipeGestureComponents> */}
        </View>

        <View style={styles.lineWrapper}>
          {Ads.map((item, index) => {
            return (
              <View
                onPress={() => this.setState({ currentAdsPosition: index })}
                key={index}
                style={[
                  styles.circle,
                  index == currentAdsPosition ? { borderColor: "#01cf13" } : {},
                ]}
              ></View>
            );
          })}
        </View>

        <View style={[styles.buttonWrapper,{}]}>
          <View>
            <GreenButton
              text="Login as GTPS Member"
              buttonWidth={300}
              onPress={() => this.props.navigation.navigate("NextScreen")}
              borderR ={1}
              borderC = {"#0C9344"}
              borderW={1}
              backgroundCol = {"#FFFFFF"}
              color={"#0C9344"}
              textStyle={{color:"#0C9344"}}
            />
          </View>
        </View>


        <View style={[styles.buttonWrapper,{}]}>
          <View>
            <GreenButton
              text="Continue to store"
              buttonWidth={300}
              onPress={() => this.props.navigation.navigate("NextScreen")}
              borderR ={1}
              borderC = {"green"}
              borderW={1}
              backgroundCol = {"#0C9344"}
              color={"green"}
              textStyle={{color:"#FFFFFF"}}
            />
          </View>
        </View>

        
      </View>
    );
  }
}
