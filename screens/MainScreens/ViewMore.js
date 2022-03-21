import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import Space from "../../components/Space/Space";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker'
import Helper from "../../Helpers/Helper";

const ViewMore = ({ navigation,props,route }) => {

    const Back = () =>{
        navigation.goBack()
    }

    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    const [bank, setBank] = useState("");
    const [activation, setActivation] = useState("");
    const [purpose, setPurpose] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [memberid, setmemberid] = useState("");
    const [depositorName, setDepositor] = useState("");
    const [amount, setAmount] = useState(0);
    const [tellerNo, settellerNo] = useState("");
    const [selectedDate, setDate] = useState(new Date())
    const [formatedDate, setFormatedDate] = useState("")
    const [open, setOpen] = useState(false)


    

    const Purpose = [
        { label: 'ACTIVATION', value: 'ACTIVATION' },
        { label: 'TOP-UP', value: 'TOP-UP' },
    ];

    const setSelectedDate=(date)=>{
        formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        
        setFormatedDate(formattedDate);
    }

    const PaymentType = [
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        { label: 'Internet Transfer', value: 'Internet Transfer' },
        { label: 'Mobile Transfer', value: 'Mobile Transfer' },
        { label: 'USSD Transfer', value: 'USSD Transfer' },
    ];

    const Banks = [
        { label: 'GTB', value: 'Gtb' },
        { label: 'ZENITH', value: 'Zenith' },
        { label: 'UBA', value: 'UBA' },
    ];

    const resetForm = () =>{
        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
    }


   


    

    const {msg} = DetailsResponse;
    const {routeData} = route.params;
    let count = 0;
  return (
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <View>
            {routeData?
            <View style = {{marginTop:20,marginBottom:20}}>
                {Object.entries(routeData).map((data,index)=>{
                    let title = data[0].toUpperCase();
                    if(title == "FNAME"){title ="FULL NAME"}else if(title == "MEMID"){title = "MEMBER ID"}
                    else if(title== "ACCTNO"){title = "ACCOUNT NAME"}

                    if(title !="ID"){
                    return(<View style = {{flexDirection:'row',justifyContent:'space-between'}} key = {count+=1}>
                        <View style = {{}}><Text style = {{color:'#0C9344',fontWeight:'bold'}}>{title}:</Text></View>
                        <View style = {{}}><Text style = {{color:'#0C9344',textAlign:'center'}}>{data[1]}</Text></View>
                    </View>)
                    }
                }
                )}

                

                
                
            
            </View>:<></>
            }
            
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
    flex: 1,
    paddingLeft:20,
    paddingRight:20,
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
  HeadingText:{
      margin:10,
      marginRight:35,
    
      fontSize:15, 
      fontWeight:'bold',
      color:"#FFFFFF"
  },
  BodyText:{
    // marginLeft:10,
    marginRight:10
}
});

export default ViewMore;
