import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';



const Withdrawal = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const setClickedFunc = (action) =>{
        setClicked(action)
    }
    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];

  return (
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <ScrollView style = {styles.BodyContainer}>
            <View style ={styles.BodyHeader}>

                <Text style = {{fontWeight:'bold', fontSize:20}}>My Withdrawal Report</Text>
            </View>

            <View >
                <View style = {styles.Card}>
                    <Text>Wallet Balance</Text>
                    <Text style = {{margin:20,fontSize:25,fontWeight:'bold'}}>=N=0.00</Text>
                    <View>
                        <ButtonComponent
                            textinput="Withdraw"
                            buttonWidth={100}
                            onPress={() => this.submitForm()}
                            // size ={"sm"}
                            boldText = {"bold"}
                            backgroundColor = {"#0C9344"}
                            borderRadius = {10}
                            textColor={"#FFFFFF"}
                            borderWidth = {1}
                            borderColors = {"#FFFFFF"}

                        />

                    </View>
                </View>

                <View>

                    <Text style = {{fontWeight:'bold', fontSize:20,marginTop:40,marginBottom:40}}>Withdrawal Report</Text>
                </View>

                <View style = {[styles.Card2,{justifyContent:'center'}]}>

                    <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>No Withdrawal Yet</Text>
                    
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
  },
  container: {
    flex: 1,
    padding:20,
  },
  headerContainer:{
    marginTop:40,
    marginBottom:20,
    // justifyContent:'',
    flexDirection:'row',
  },
  BodyContainer:{
    flex:1,
    borderRadius:20,
    padding:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

    Card:{
    // flex:1,
    borderRadius:10,
    padding:20,
    height:200,
    marginTop:10,
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  Card2:{
    // flex:1,
    borderRadius:10,
    padding:20,
    height:180,
    // marginTop:10,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderWidth:1,
    borderColor:'#979797',
    shadowRadius: 1,
    alignContent:'center',
    alignItems:'center'
  },
});

export default Withdrawal;