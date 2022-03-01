import React, { useState, useEffect } from "react";
import { View, Button,ActivityIndicator, Text, StyleSheet,ScrollView,Alert,TouchableOpacity } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Helper from "../../Helpers/Helper";
import Space from "../../components/Space/Space";

const PaymentReport = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    useEffect(() => {
        fetchPaymentReport()
    },[]);

    const viewMore =(data)=>{

      navigation.navigate({
         
        name:'ViewMore',
        params: { routeData:data},
        });
    }

    const fetchPaymentReport =async()=>{
      try {
  
        console.log("insideTryLogin")
        setProcessing(true);
        
        let payload = "backoffice/payments_report.jsp?memberid="+global.user.memberid+"&api";
        console.log("payloadShop", payload);
        await Helper.getRequest(payload)
        .then((result) =>{ 
          // console.log()
          let { message, error, response } = result;
         
          setProcessing(false);
          if (!error) {
            setDetailsResponse(response);
            
          } else {
            Alert.alert("Withdrawal", message);
          }
  
        });
  
        
      } catch (error) {
        setProcessing(false);
        Alert.alert("Error", error.toString());
      }
    }

    const Back = () =>{
        navigation.goBack()
    }

    

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }


   

    const TableContent =(sn,memberID,amount,status,type,date,teller,bank,data)=>{
      return (
          <View style={{flexDirection:'row',marginTop:10}} key = {sn}>
              <View style = {{width:20,marginLeft:10}}><Text>{sn}</Text></View>          
              <View style = {{width:70,}}><Text >{teller}</Text></View>
              <View style = {{width:70,}}><Text style={{textAlign:'center'}}>{bank}</Text></View>
              <View style = {{width:80,marginLeft:10}}><Text style = {{textAlign:'center'}}>{amount}</Text></View>
              
              <View style = {{width:100,marginLeft:30,marginBottom:10,justifyContent:"center"}}>

                <ButtonComponent
                    textinput="View More"
                    buttonWidth={80}
                    onPress={() => viewMore(data)}
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


    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];
  const {paymentList} = DetailsResponse;
  let count = 0;

  return (
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.BodyContainer}>
          <View >
              <View style ={[styles.BodyHeader,{marginTop:20}]}>

                  <Text style = {{fontWeight:'bold', fontSize:20}}>My Payment Report</Text>
              </View>

              <View>
                  {/* <View style = {[styles.Card2,{justifyContent:'center'}]}> */}

                      {/* <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>No Withdrawal Yet</Text> */}
                      {processing?<View style = {{marginBottom:20}}><ActivityIndicator size="large" color="#00ff00" /></View>:
                      paymentList && paymentList.length>0?
                      <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View  style = {{}}>
                                <View  style={{flexDirection:'row',backgroundColor:'#0C9344'}}>
                                    <Text style ={[styles.HeadingText,{width:10}]}>#</Text>
                                    <Text style = {styles.HeadingText}>Teller</Text>
                                    <Text style = {styles.HeadingText}>Bank</Text>
                                    <Text style = {styles.HeadingText}>Salary</Text>
                                    <Text style = {styles.HeadingText}>View More</Text>
                                </View>
                                <Space top = {10}/>
                                
                                {/* [{"acctname": "jackma", "acctno": "1234567890", "amount": "2", "bank": "GTB", "date": "2022-02-24 13:23:10.0", "fname": "Orie Josiah", "id": "179", "memid": "202012340008", "naira": "800.00", "status": "pending", "trans": "GT-2022022413239"}] */}
                                
                                {paymentList.map((data)=>TableContent(count+=1,data.memid,data.amount,data.status,data.type,data.datepaid,data.teller,data.bank,data))}
                                
                                
                            </View>
                        </ScrollView>
                    </View>
                    :<View style = {{flexDirection:'row'}}><Text>No Payment Found</Text>
                      <TouchableOpacity
                        onPress={()=>fetchPaymentReport}
                        // disabled={processing}
                        style={{}}
                      >
                        <FontAwesome name = "refresh" onPress = {fetchPaymentReport} size={20}/>
                      </TouchableOpacity>
                    </View>
                    }
                  {/* </View> */}
              </View>   

              
          </View>
        </View>
      {/* CardBody Ends */}
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
    paddingLeft:10,
    paddingRight:10,
    // marginBottom:10,
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
    paddingLeft:20,
    paddingRight:20,
    // margin:20,
    backgroundColor:"#FFFFFF",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

    Card:{
    // flex:1,
    // borderRadius:10,
    padding:20,
    height:150,
    marginTop:10,
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  Card2:{
    // flex:1,
    borderRadius:10,
    // padding:20,
    height:180,
    marginBottom:10,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderWidth:1,
    borderColor:'#979797',
    shadowRadius: 1,
    alignContent:'center',
    alignItems:'center'
  },
  HeadingText:{
      margin:5,
      // marginRight:45,
      width:80,
      fontSize:15, 
      fontWeight:'bold',
      color:"#FFFFFF"
  },
});

export default PaymentReport;