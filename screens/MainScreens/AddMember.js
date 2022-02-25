import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Alert,ActivityIndicator } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Helper from "../../Helpers/Helper";


const AddMember = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEmail, setIsEmail] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    
    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const setClickedFunc = (action) =>{
        setClicked(action)
    }

    const resetForm = () =>{
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
    }

    const submitForm = async()=>{
      if(isEmail){
          let payload = {
            textFirstName: firstname,
            textLastName: lastname,
            textEmail: email,
            textPhone: phone,
            memberid: ' 202012340517',
            comboSideID: phone,
            textMemberID: ' 202012340008' 
          }
          try {
  
            // console.log("insideTryLogin")
            setProcessing(true);
            
            let linkUrl = "MemberControllerServlet?action=NewMember&api";
            console.log("payloadShop", payload);
            await Helper.getRequest(linkUrl,"post",payload)
            .then((result) =>{ 
              let { message, error, response } = result;
             
              setProcessing(false);
              if (!error) {
                setDetailsResponse(result.response);
                resetForm();
                Alert.alert("New Member", result.response.msg);
              } else {
                Alert.alert("Member", message);
              }
      
            });
            
          } catch (error) {
            setProcessing(false);
            Alert.alert("Error", error.toString());
          }
      }else{
        Alert.alert("Member", "Please Enter A Valid Email");
      }
    }

    const validateEmail = (text)=>{
      
        console.log("emailEntered",text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          console.log("Email is Not Correct");
          setEmail(text )
          setIsEmail(false)
          return false;
        }
        else {
          setEmail(text )
          setIsEmail(true)
          console.log("Email is Correct");
        }
      
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];
    const {msg} = DetailsResponse;
  return (
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <ScrollView style = {{}}>
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
                  {msg?
                  <Text style = {{fontWeight:'bold', fontSize:15,color:"#0C9344"}}>{msg?msg:""}</Text>
                  :<View></View>
                  }
              </View>                          

              <ScrollView style ={styles.ContentBody}>


                  <View style = {{paddingTop:30}}>
                      <InputBox
                      // keyboardType="numeric"
                      onChangeText={(value) => setFirstname(value)}
                      inputValue={firstname}
                      borderWidth={1}
                      inputLabel = {"First Name"}
                      placeholder={"First Name"}
                      textColor="black"
                      background="#FFFFFF"
                      />
                  </View>

                  <View style = {{paddingTop:30}}>
                      <InputBox
                      // keyboardType="numeric"
                      onChangeText={(value) => setLastname(value)}
                      inputValue={lastname}
                      borderWidth={1}
                      inputLabel = {"Last Name"}
                      placeholder={"Last name"}
                      textColor="black"
                      background="#FFFFFF"
                      />
                  </View>
                  
                  <View style = {{paddingTop:30}}>
                      <InputBox
                      // keyboardType="numeric"
                      onChangeText={(value) => validateEmail(value)}
                      inputValue={email}
                      borderWidth={1}
                      inputLabel = {"Email"}
                      placeholder={"Email"}
                      textColor="black"
                      background="#FFFFFF"
                      />
                  </View>


                  <View style = {{paddingTop:30}}>
                      <InputBox
                      // keyboardType="numeric"
                      onChangeText={(value) => setPhone(value)}
                      inputValue={phone}
                      borderWidth={1}
                      inputLabel = {"Phone"}
                      placeholder={"Phone Number"}
                      textColor="black"
                      background="#FFFFFF"
                      />
                  </View>


                  
              </ScrollView>
              
          </View>
          {/* CardBody Ends */}

          <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
              <View style={{justifyContent:'center',marginTop:20,marginBottom:30}}>
                  <ButtonComponent
                      textinput="Add Member"
                      buttonWidth={250}
                      onPress={() => submitForm()}
                      processing = {processing}
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
    //  paddingBottom:10
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