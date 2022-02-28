import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import Space from "../../components/Space/Space";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker'
import Helper from "../../Helpers/Helper";

const GenerologyList = ({ navigation,props }) => {

    const Back = () =>{
        navigation.goBack()
    }

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEmail, setIsEmail] = useState(true);
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
        console.log("formatedDate",formattedDate);
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


    const submitForm = async()=>{

        if(amount>0){
            if(paymentType!="" && memberid!="" && amount!=0 && tellerNo!="" && bank!="" && formatedDate!="" && depositorName!=""){
                let payload = {
                    textPurpose: purpose,
                    textType: paymentType,
                    textMemberID: memberid,
                    textAmount: amount,
                    textTeller: tellerNo,
                    textBank: bank,
                    textDate: formatedDate ,
                    textDepositor: depositorName,
                    textFunction: 'new',
                    textPayID: 'blabla',
                }
                console.log(payload);
                // return;
                try {

                    // console.log("insideTryLogin")
                    setProcessing(true);
                    
                    let linkUrl = "MemberPaymentControllerServlet?action=newPaymentMem&api";
                    console.log("payloadShop", payload);
                    await Helper.getRequest(linkUrl,"post",payload)
                    .then((result) =>{ 
                    let { message, error, response } = result;
                    
                    setProcessing(false);
                    if (!error) {
                        setDetailsResponse(result.response);
                        resetForm();
                        Alert.alert("Payment", result.response.msg);
                    } else {
                        Alert.alert("Payment", message);
                    }
            
                    });
                    
                } catch (error) {
                    setProcessing(false);
                    Alert.alert("Error", error.toString());
                }
            }else{
                Alert.alert("Payment", "Empty Fields are required");
            }
        }else{
            Alert.alert("Payment", "Please Enter A Valid Amount");
        }
    }
    const toggleDate=()=>{
        console.log("toggleDate");
        setOpen(true)
    }
    console.log("myDateGoesHere",selectedDate);

    const getSelectedValue =()=>{
        return PaymentType;
    }



    const TableContent =(memberID,Name,Status)=>{
        return (
            <View style={{flexDirection:'row',}}>
                            
                <View style = {{width:100}}><Text>{memberID}</Text></View>
                <View style = {{width:100,marginLeft:20}}><Text style = {{textAlign:'center'}}>{Name}</Text></View>
                <View style = {{width:100,marginLeft:40}}><Text style = {{textAlign:'center'}}>{Status}</Text></View>
                
                <View style = {{width:100,marginLeft:20,justifyContent:"center"}}>

                    <ButtonComponent
                        textinput="View"
                        buttonWidth={50}
                        onPress={() => submitForm()}
                        boldText = {"bold"}
                        processing = {processing}
                        backgroundColor = {null}
                        borderRadius = {10}
                        btnHeight = {30}
                        textColor={"#0C9344"}
                        borderWidth = {1}
                        borderColors = {"#0C9344"}

                    />
                </View>
            </View>
        );
    }

    const {msg} = DetailsResponse;
  return (
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <View>
            <View>
                <Text style = {{fontSize:24,fontWeight:'bold'}}>Geneology Summary </Text>
            </View>

            <View style = {{marginTop:20,marginBottom:20}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',fontWeight:'bold'}}>Total Downlines:</Text></View>
                    <View style = {{width:120,height:30,justifyContent:'center'}}><Text style = {{color:'#0C9344',textAlign:'center'}}>51 Downlines</Text></View>
                </View>

                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',}}>Total A-Side</Text></View>
                    <View style = {{width:120,backgroundColor:'green',height:30,justifyContent:'center'}}><Text style = {{textAlign:'center',color:'#FFFFFF'}}>5 Downlines</Text></View>
                </View>

                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',}}>Total B-Side</Text></View>
                    <View style = {{width:120,}}><Text style = {{color:'#0C9344',textAlign:'center'}}>47 Downlines</Text></View>
                </View>
            
            </View> 

            <View>
                <View style = {{borderColor:'green',borderWidth:1,margin:20,borderRadius:20,padding:10}}>
                    <Text style={{fontSize:10,textAlign:'center',fontWeight:'bold'}}>GREENLIFE TREASURE PURSE REFERRAL NETWORK</Text>
                    <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold'}}> RIE JOSIAH - 202012340008</Text>
                </View>
            </View>


            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View  style = {{}}>
                        <View  style={{flexDirection:'row',backgroundColor:'#0C9344'}}>
                            <Text style ={styles.HeadingText}>MemberID</Text>
                            <Text style = {styles.HeadingText}>Destributor Name</Text>
                            <Text style = {styles.HeadingText}>Status</Text>
                            <Text style = {styles.HeadingText}>Action</Text>
                        </View>
                        <Space top = {10}/>

                        {TableContent("10000203445","Phillip","Active")}

                    </View>
                </ScrollView>
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

export default GenerologyList;
