import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';



const AddMember = ({ navigation,props }) => {

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
      <View style = {styles.headerContainer}>
        <View>
          
          <BackBtn 
            onPress = {Back}
          />
        </View>
        
        <View style = {{marginLeft:100}}>
          <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
          <Text style = {{textAlign:'center'}}>202012340008</Text>
        </View>

      </View>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <View style = {styles.BodyContainer}>
            <View style ={styles.BodyHeader}>

                <Text style = {{fontWeight:'bold', fontSize:20}}>Add New Member</Text>
            </View>

            <View >

                <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={(text) => setSearchPhraseFunc(text)}
                clicked={clicked}
                searchPlaceHolder={"Search Member ID here"}
                setClicked={(clicked) => setClickedFunc(clicked)}
                />
            </View>   

            <View >

                <Text style = {{fontWeight:'bold', fontSize:15,marginTop:10,marginBottom:20}}>Registration Fee: =N=70,000.00</Text>
            </View>                          

            <ScrollView style ={styles.ContentBody}>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Enter First Name"}
                    borderWidth={1}
                    inputLabel = {"First Name"}
                    placeholder={"Member ID"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>

                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Enter Last Name"}
                    borderWidth={1}
                    inputLabel = {"Last Name"}
                    placeholder={"Member ID"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>
                
                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Enter Email"}
                    borderWidth={1}
                    inputLabel = {"Email"}
                    placeholder={"Member ID"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Enter Phone"}
                    borderWidth={1}
                    inputLabel = {"Phone"}
                    placeholder={"Member ID"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                
            </ScrollView>
            
        </View>
      {/* CardBody Ends */}

        <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <View style={{justifyContent:'center',marginTop:20}}>
                <ButtonComponent
                    textinput="Add Member"
                    buttonWidth={250}
                    onPress={() => this.submitForm()}
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
    flex: 0.9,
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
  }
});

export default AddMember;