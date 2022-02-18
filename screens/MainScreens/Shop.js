import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Image } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import ShopImage from "../../assets/shop.png";

const Shop = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const toggleNav = () =>{ console.log("navToggled");  navigation.openDrawer()}

    const setClickedFunc = (action) =>{
        setClicked(action)
    }

    const AddStock =() =>{
        navigation.navigate('AddStock');
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];

  return (
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {toggleNav} memberId = {"10000203445"} headerType = {"home"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <ScrollView style = {styles.BodyContainer}>

            <View>
                <View style = {styles.Card}>
                    <Text style = {{fontWeight:'bold', fontSize:20}}>Hello, Orio Josiah</Text>
                    <Text style = {{}}>Welcome to your e-shop summary dashboard.</Text>

                    <Text style = {{marginTop:10,}}>GTPS provides a market-place platform designed to enable the meeting point between business owners, eg service providers, retailers and prospective clients or buyers.

                    </Text>
                    
                    <Text style = {{marginTop:10,}}>For easy implementation, we are piloting this service in Nigeria first.</Text>
                </View>

                {/* <View>

                    <Text style = {{fontWeight:'bold', fontSize:20,marginTop:40,marginBottom:40}}>Withdrawal Report</Text>
                </View> */}

                <View style = {[styles.Card2,{marginTop:40,flexDirection:'row',}]}>

                    <View style = {{marginRight:20,paddingLeft:20,justifyContent:'center'}}>
                        <Image
                            source = {ShopImage}
                            size = {200}
                        />
                    </View>

                    <ScrollView>
                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Shop Number</Text>
                            <Text style = {styles.BoldText}>GTPS0054</Text>
                        </View>
                        <View style = {{marginBottom:25}}>
                            <Text style = {{marginBottom:8,}}>Shop Number</Text>
                            <Text style = {styles.BoldText}>Adebayo street</Text>
                        </View>

                        <View style = {{marginBottom:25}}>
                            <Text style = {{marginBottom:8,}}>Shop Street</Text>
                            <Text style = {styles.BoldText}>Adebayo street, Kosofe local govt, Lagos</Text>
                        </View>
                    </ScrollView>
                    
                </View>

                <View style = {{marginTop:25,}}>
                    <Text style = {[styles.BoldText,{alignSelf:'center'}]}>Its time to start adding to your stocks!!!</Text>
                </View>

                <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <View style={{justifyContent:'center',marginTop:20}}>
                        <ButtonComponent
                            textinput="Click here to add stock"
                            buttonWidth={250}
                            onPress={() => {AddStock()}}
                            // size ={"sm"}
                            boldText = {"bold"}
                            backgroundColor = {"#0C9344"}
                            borderRadius = {16}
                            textColor={"#FFFFFF"}
                            borderWidth = {1}
                            borderColors = {"#FFFFFF"}

                        />
                        
                    </View>
                </View>
               
            </View>   

                                   

            
            
        </ScrollView>
      {/* CardBody Ends */}

        
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    padding:15,
    backgroundColor:'white',
  },
  headerContainer:{
    marginTop:40,
    marginBottom:20,
    // justifyContent:'',
    flexDirection:'row',
  },
  BodyContainer:{
    flex:1,
    backgroundColor:"white",

  },
  BoldText:{
    fontWeight:'bold',
    fontSize:15,

  },
    Card:{
    borderRadius:5,
    padding:20,
    height:200,
    marginTop:10,
    backgroundColor:"#97ADB6",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  Card2:{
    borderRadius:10,
    padding:10,
    height:200,
    marginTop:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderColor:'#979797',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // alignContent:'center',
    // alignItems:'center'
  },
});

export default Shop;