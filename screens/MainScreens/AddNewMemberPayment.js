import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker'
import Helper from "../../Helpers/Helper";

const AddNewMemberPayment = ({ navigation,props }) => {

    const Back = () =>{
        navigation.goBack()
    }

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    const [bank, setBank] = useState("");
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
        let formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
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
                // return;
                try {

                    setProcessing(true);
                    
                    let linkUrl = "MemberPaymentControllerServlet?action=newPaymentMem&api";
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
        
        setOpen(true)
    }

    const getSelectedValue =()=>{
        return PaymentType;
    }

    const {msg} = DetailsResponse;
  return (
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style = {styles.BodyContainer}>
                <View style ={styles.BodyHeader}>

                    <Text>Add New Member Payment</Text>
                </View>


                <View>{msg?
                  <Text style = {{fontWeight:'bold', fontSize:15,color:"#0C9344"}}>{msg?msg:""}</Text>
                  :<View></View>
                  }
                </View>

                <ScrollView style ={styles.ContentBody} showsVerticalScrollIndicator={false}>

                    <View style = {{paddingTop:30}}>
                        <SelectBox
                            value={purpose}
                            onValueChange={(value) =>setPurpose(value)}
                            placeholder={{ label: "Select Purpose:", value: null }}
                            items={Purpose}
                            inputLabel = {"Select Purpose:"}
                        />
                    </View>



                    <View style = {{paddingTop:30}}>
                    
                        <SelectBox
                            value={paymentType}
                            onValueChange={(value) =>setPaymentType(value)}
                            placeholder={{ label: "Select Payment Type:", value: null }}
                            items={PaymentType}
                            inputLabel = {"Select Payment Type:"}
                        />
                    </View>

                    <View style = {{paddingTop:30}}>
                        <InputBox
                        // keyboardType="numeric"
                        onChangeText={(value) => setmemberid(value)}
                        inputValue={memberid}
                        borderWidth={1}
                        inputLabel = {""}
                        placeholder={"Member ID"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>


                    <View style = {{paddingTop:30}}>
                        <InputBox
                        // keyboardType="numeric"
                        onChangeText={(value) => setDepositor(value)}
                        inputValue={depositorName}
                        borderWidth={1}
                        inputLabel = {""}
                        placeholder={"Depositor's Name"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>


                    <View style = {{paddingTop:30}}>
                        <InputBox
                        keyboardType="numeric"
                        onChangeText={(value) => {value>=0?setAmount(value):Alert.alert("Payment", "Please Enter a Valid Amount")}}
                        inputValue={amount}
                        borderWidth={1}
                        // inputLabel = {""}
                        placeholder={"Enter Amount Paid"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>



                    <View style = {{paddingTop:30}}>
                        <InputBox
                        // keyboardType="numeric"
                        onChangeText={(value) => settellerNo(value)}
                        inputValue={tellerNo}
                        borderWidth={1}
                        inputLabel = {"Enter Teller No"}
                        placeholder={"Enter Teller No"}
                        textColor="black"
                        background="#FFFFFF"
                        // onPress = {toggleDate}
                        />
                    </View>


                    <View style = {{paddingTop:30}}>
                        <TouchableOpacity onPress={toggleDate}>
                            <InputBox
                            onChangeText={(selectedDate) => null}
                            inputValue={formatedDate.toString()}
                            borderWidth={1}
                            inputLabel = {""}
                            placeholder={"dd/mm/yyyy"}
                            textColor="black"
                            background="#FFFFFF"
                            onPress = {toggleDate}
                            caretHidden={true}
                            />
                        </TouchableOpacity>

                        <DatePicker
                                modal
                                open={open}
                                mode = "date"
                                date={selectedDate}
                                onConfirm={(date) => {
                                setOpen(false)
                                setSelectedDate(date)
                                }}
                                onCancel={() => {
                                setOpen(false)
                                }}
                            />
                    </View>


                    <View style = {{paddingTop:30}}>
                        <SelectBox
                            value={bank}
                            onValueChange={(value) =>setBank(value)}
                            placeholder={{ label: "Select Bank:", value: null }}
                            items={Banks}
                            inputLabel = {""}
                        />
                    </View>
                </ScrollView>
                
            </View>
            {/* CardBody Ends */}

            <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                <View style={{justifyContent:'center',marginTop:20,marginBottom:30}}>
                    <ButtonComponent
                        textinput="Add Member Payment"
                        buttonWidth={250}
                        onPress={() => submitForm()}
                        boldText = {"bold"}
                        backgroundColor = {"#0C9344"}
                        processing = {processing}
                        borderRadius = {16}
                        textColor={"#FFFFFF"}
                        borderWidth = {1}
                        borderColors = {"#FFFFFF"}

                    />
                    
                </View>
            </View>
        </ScrollView>
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
  }
});

export default AddNewMemberPayment;