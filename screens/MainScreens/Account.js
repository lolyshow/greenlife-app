import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import Space from "../../components/Space/Space";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Helper from "../../Helpers/Helper";

const Account = ({ navigation,props }) => {

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




  const {msg} = DetailsResponse;
  return (
    
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style = {{marginTop:20,marginBottom:20}}>
            <View style = {{flexDirection:'row',justifyContent:'center'}}>
                <View style = {{justifyContent:'center'}}>
                  <Avatar.Image 
                      source={{
                          uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                      }}
                      size={100}
                  />
                  <Text style = {{textAlign:'center',fontWeight:'bold',fontSize:20}}>Josiah Orie</Text>
                </View>
            </View>
          </View>


          <View style = {{}}>
            <View><Text style = {{fontSize:12, color:"#979797"}}>Personal Information</Text></View>

            <View>
              <View>
                <TouchableOpacity
                  onPress={()=>navigation.navigate("EditProfile")}
                  // disabled={processing}
                  style={{}}
                >
                  {/* <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "user" size={20}/>
                      <Text style = {{marginLeft:20}}>My Information</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "angle-right" size={20}/>
                    </View>

                  </View> */}
                </TouchableOpacity>
                

                <TouchableOpacity
                  onPress={()=>navigation.navigate("Wallet")}
                  // disabled={processing}
                  style={{}}
                >
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "credit-card-alt" size={20}/>
                      <Text style = {{marginLeft:20}}>My Wallet</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "angle-right" size={20}/>
                    </View>

                  </View>
                </TouchableOpacity>


                
                <TouchableOpacity
                  onPress={()=>navigation.navigate("CommissionReport")}
                  // disabled={processing}
                  style={{}}
                >
                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "credit-card-alt" size={20}/>
                      <Text style = {{marginLeft:20}}>My Commission</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "angle-right" size={20}/>
                    </View>

                  </View>
                </TouchableOpacity>

                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "question-circle" size={20}/>
                      <Text style = {{marginLeft:20}}>How it Works</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "angle-right" size={20}/>
                    </View>

                  </View>


                  <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "exclamation-circle" size={20}/>
                      <Text style = {{marginLeft:20}}>About</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:30}}>
                      <FontAwesome name = "angle-right" size={20}/>
                    </View>

                  </View>

                  
                
              </View>


              
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

export default Account;
