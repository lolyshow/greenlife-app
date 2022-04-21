import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ImageBackground,Dimensions,Image,Alert,TextInput,ScrollView } from "react-native";
import logo from "../../assets/greenlife_logo.jpeg";
import unsplash from "../../assets/unsplash.png";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
import { useDispatch,useSelector } from "react-redux";
import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import InputBox from "../../components/InputBox";
import Helper from "../../Helpers/Helper";
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell} from 'react-native-confirmation-code-field';
import { handleActiveTab } from "../../reduxx/actions/requests";

const CELL_COUNT = 10;



export default function EmailVerify({navigation,route}) {

    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const [processing, setProcessing] = useState(false);
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const dispatch = useDispatch()
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

  const submitForm = async () => {
    let payload = {
      "memid": route.params.memberid,
      "code": value
    }
    
    try {

      setProcessing(true)
      let linkUrl = "AjaxCodeConfirmationServlet?action=confirmEmail&api";
        await Helper.Request(linkUrl,"post",payload)
        .then((result) =>{ 
          
          let { message, error, response } = result;
          setProcessing(false)
          if (!error && result.response.status === true) {
            setProcessing(false)
            dispatch(handleActiveTab(true))
            navigation.navigate("MemberActivatePayment",{message:"Confirmation Successfull, please login to continue"})
            
          } else {
            setProcessing(false)
            Alert.alert("Member", response.msg);
          }
        });
        
      } catch (error) {
        setProcessing(false);
        Alert.alert("Error", error.toString());
      }
    
  };


  return (
    <View
        source={unsplash}
        style={styles.centered}
      >
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style = {{marginTop:20,justifyContent:"center",alignItems:'center'}}>
            <Image source = {logo} style={{width:150,height:150}}/>

        </View>

        <View style={{padding:20}}>
            <Text style = {{fontSize:20, fontWeight:"bold"}}>We have sent a verification code to {route.params?.email}</Text>
            <Text style = {{fontSize:12, color:"#979797", marginTop:10,}}>You should have received an email from Green Life Network containing 6 digit verification code. If it’s not in your inbox please check your spam folder.</Text>
        </View>


        <View style={{}}>
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
                    disabled={processing}
                      processing={processing}
                    onPress={() => submitForm()}
                />
            </View>


            
        </View>

      </ScrollView> 
      
    </View>
  );
}
  
const styles = StyleSheet.create({
  centered: {
    backgroundColor:"#FFFF",
    padding:10,
    flex:1
  },

  body:{
    marginTop:50,
    alignItems:"center",
    justifyContent:"center",
    
  },
  inputContainer: {
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
  // cell: {
  //   width: 10,
  //   height: 20,
  //   // lineHeight: 38,
  //   // fontSize: 24,
  //   // borderWidth: 2,
  //   borderColor: '#00000030',
  //   textAlign: 'center',
  // },
  focusCell: {
    borderColor: '#000',
  },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 8,
    // backgroundColor:'blue'
  },
  cell: {
    width: 20,
    height: 30,
    // lineHeight: 55,
    fontSize: 30,
    fontWeight:"400",
    textAlign: 'center',
    marginLeft: 8,
    borderWidth:1,
    borderRadius: 6,
    backgroundColor: '#FFFF',
  },
});
