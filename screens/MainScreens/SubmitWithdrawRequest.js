import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ScrollView,Alert } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import SelectBox from "../../components/SelectBox";
import HeaderComponent from "../../components/HeaderComponent";
import Helper from "../../Helpers/Helper";
import { set } from "react-native-reanimated";



const SubmitWithdrawRequest = ({ navigation,props }) => {

    const Back = () =>{
        navigation.goBack()
    }

    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    const [bank, setBank] = useState("");
    const [purpose, setPurpose] = useState("");
    const [withdrawalType, setWithdrawalType] = useState("");
    const [memberid, setmemberid] = useState("");
    const [depositorName, setDepositor] = useState("");
    const [accountNo, setAccountNo] = useState("");
    const [accountName, setAccountName] = useState("");
    const [amount, setAmount] = useState(0);
    
    const Banks = [
      { label: 'GTB', value: 'Gtb' },
      { label: 'ZENITH', value: 'Zenith' },
      { label: 'UBA', value: 'UBA' },
    ];

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];

    const WithdrawalType = [
      { label: 'Commission', value: 'commissions' },
      { label: 'Wallet', value: 'wallet' },
      
  ];
    const resetForm = ()=>{
      setAmount(0)
      setBank("");
      setAccountNo("");
      setAccountName("");
      setWithdrawalType("");
    }

    const submitForm = async()=>{

      if(amount>0){
        console.log("insideSubmitFormm")
          if(amount!=0 && bank!="" && accountNo!="" && accountName!="" && withdrawalType!=""){
              let payload = {
                  textBalance: amount,
                  textAmount: amount,
                  comboBank: bank,
                  textAccountNo: accountNo,
                  texttAccountName: accountName,
                  textMemID: global.user.memberid,
                  textFlag: withdrawalType,
                  textFunction: 'new'
              }
              console.log(payload);
              // return;
              try {

                  // console.log("insideTryLogin")
                  setProcessing(true);
                  
                  let linkUrl = "MemberCommissionServlet?action=Add_withdrawal&api";
                  console.log("payloadShop", payload);
                  await Helper.getRequest(linkUrl,"post",payload)
                  .then((result) =>{ 
                  let { message, error, response } = result;
                  // console.log("myResalResponse",result.response)
                  setProcessing(false);
                  if (!error) {
                      setDetailsResponse(result.response);
                      resetForm();
                      Alert.alert("Withdrawal", result.response.msg);
                  } else {
                      Alert.alert("Withdrawal", message);
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
  const {msg} = DetailsResponse;
  return (
    <View style={styles.container}>
        {/* header Starts */}
            <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
        {/* Header Container Ends */}



      {/* Body Starts */}
      <ScrollView>
        <View style = {styles.BodyContainer}>
            <View style ={styles.BodyHeader}>

                <Text style = {{fontWeight:'bold'}}>Submit Withdrawal Request</Text>
            </View>

            <View style ={{marginTop:20}}>

                <Text>Account Balance:=N=70,000.0</Text>
            </View>


            <View>{msg?
              <Text style = {{fontWeight:'bold', fontSize:15,color:"#0C9344"}}>{msg?msg:""}</Text>
              :<View></View>
              }
            </View>

            <ScrollView style ={styles.ContentBody}>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    keyboardType={"numeric"}
                    onChangeText={(value) =>{value>=0?setAmount(value):Alert.alert("Payment", "Please Enter a Valid Amount")}}
                    borderWidth={1}
                    placeholder={"Enter Amount to Withdraw"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={bank}
                        onValueChange={(value) =>setBank(value)}
                        placeholder={{ label: "Select Bank:", value: null }}
                        items={Banks}
                        // inputLabel = {"Select Bank:"}
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={withdrawalType}
                        onValueChange={(value) =>setWithdrawalType(value)}
                        placeholder={{ label: "Select Withdraw Type:", value: null }}
                        items={WithdrawalType}
                        // inputLabel = {"Select Bank:"}
                    />
                </View>


                

                <View style = {{paddingTop:30}}>
                    <InputBox
                    keyboardType="numeric"
                    onChangeText={(value) => setAccountNo(value)}
                    inputValue={accountNo}
                    borderWidth={1}
                    placeholder={"Enter Account Number"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    onChangeText={(value) => setAccountName(value)}
                    inputValue={accountName}
                    borderWidth={1}
                    // inputLabel = {"Enter Amount"}
                    placeholder={"Enter Account Name"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>



                <View style = {{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:40,marginBottom:20}}>
                
                  <View style={{justifyContent:'center'}}>
                      <ButtonComponent
                          textinput="Submit Withdrawal Request"
                          buttonWidth={250}
                          onPress={() => submitForm()}
                          boldText = {"bold"}
                          processing = {processing}
                          backgroundColor = {"#0C9344"}
                          borderRadius = {16}
                          textColor={"#FFFFFF"}
                          borderWidth = {1}
                          borderColors = {"#FFFFFF"}

                      />
                      
                  </View>
                </View>
            </ScrollView>

            
        </View>
      {/* CardBody Ends */}

        <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            
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
    flex: 0.95,
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

export default SubmitWithdrawRequest;