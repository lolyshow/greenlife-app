import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,TextInput } from "react-native";
import logo from "../assets/logo2.png";
import unsplash from "../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);

import GreenButton from "../components/GreenButton";
import WhiteButton from "../components/WhiteButton";
import InputBox from "../components/InputBox";
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell} from 'react-native-confirmation-code-field';

const CELL_COUNT = 5;



export default function EmailVerify() {

    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const toggleMask = () => setEnableMask((f) => !f);
    const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '*' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <View
        source={unsplash}
        style={styles.centered}
      >

        <View style = {{marginTop:50,justifyContent:"center",alignItems:'center'}}>
            <Image source = {logo} />

        </View>

        <View style={{padding:20}}>
            <Text style = {{fontSize:20, fontWeight:"bold"}}>We have sent a verification code to youremail@gmail.com</Text>
            <Text style = {{fontSize:12, color:"#979797", marginTop:10,}}>You should have received an email from Green Life Network containing 5 digit verification code. If it’s not in your inbox please check your spam folder.</Text>
        </View>


        <View style={{padding:20}}>
            {/* <Text style = {{fontSize:15, fontWeight:"bold"}}>Member ID</Text> */}
            <View style={styles.inputWrapper}>
                
                <View style={styles.fieldRow}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                        
                    
                    />
                    <Text style={styles.toggle} onPress={toggleMask}>
                        {/* {enableMask ? '🙈' : '🐵'} */}
                    </Text>
                </View>

            </View>
        </View>


        <View style = {styles.body}>
            <View style={styles.buttonWrapper}>
                <GreenButton
                    text="Submit"
                    buttonWidth={250}
                    onPress={() => props.navigation.navigate("Login")}
                />
            </View>


            
        </View>

       
      
    </View>
  );
}
  
const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    // alignItems: "center",
    paddingBottom:10,
    paddingTop:50,
    // opacity: 0.8,
  },

  body:{
    marginTop:50,
    alignItems:"center",
    justifyContent:"center",
    
  },
  inputContainer: {
  // width:350,
  borderWidth: 1,
  justifyContent:'space-between',
  flexDirection:'row',
},
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
  input: {
    height: 50,
    // backgroundColor: "#eeededa8",
        padding: 5,
  },
  inputWrapper: {
    marginTop:10,
    flexDirection: "column",
    marginBottom: 10,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 8,
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginLeft: 8,
    borderWidth:1,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
});
