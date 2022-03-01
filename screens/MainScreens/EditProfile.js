import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import HeaderComponent from "../../components/HeaderComponent";
import Helper from "../../Helpers/Helper";
import InputBox from "../../components/InputBox";
import ButtonComponent from "../../components/ButtonComponent";

const EditProfile = ({ navigation,props }) => {

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

    console.log("myDateGoesHere",selectedDate);



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

            
            <View style = {{}}>
                <InputBox
                // keyboardType="numeric"
                onChangeText={(value) => console.log('')}
                // inputValue={navigation.params.ShopID}
                borderWidth={1}
                // inputLabel = {"Shop ID:"}
                placeholder={"GTPS0054"}
                textColor="black"
                background="#FFFFFF"
                />
            </View>


            <View style = {{}}>
                <InputBox
                // keyboardType="numeric"
                onChangeText={(value) => console.log('')}
                // inputValue={navigation.params.ShopID}
                borderWidth={1}
                // inputLabel = {"Shop ID:"}
                placeholder={"GTPS0054"}
                textColor="black"
                background="#FFFFFF"
                />
            </View>



            <View style = {{marginBottom:30}}>
                <InputBox
                // keyboardType="numeric"
                onChangeText={(value) => console.log('')}
                // inputValue={navigation.params.ShopID}
                borderWidth={1}
                // inputLabel = {"Shop ID:"}
                placeholder={"GTPS0054"}
                textColor="black"
                background="#FFFFFF"
                />
            </View>
          </View>


          <View style = {{marginTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                
            <View style={{justifyContent:'center',marginBottom:20}}>
                <ButtonComponent
                    textinput="Save"
                    buttonWidth={250}
                    onPress={() => submitForm()}
                    processing={processing}
                    boldText = {"bold"}
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

export default EditProfile;
