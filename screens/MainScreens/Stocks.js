import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Image,ActivityIndicator,TouchableOpacity } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import ShopImage from "../../assets/shop.png";
import { getCountriesApiServices } from "../../services/getCountries";
import Helper from "../../Helpers/Helper";

const Stocks = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ShopDetailsResponse, setShopDetailsResponse] = useState({});

    useEffect(() => {
      fetchShopDetails()
    },[]);

    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const toggleNav = () =>{ console.log("navToggled");  navigation.openDrawer()}

    const setClickedFunc = (action) =>{
        setClicked(action)
    }


    const fetchShopDetails =async()=>{
      try {
  
        console.log("insideTryLogin")
        setProcessing(true);
        
        let payload = "backoffice/shop_details.jsp?memberid="+global.user.memberid+"&api";
        console.log("payloadShop", payload);
        await Helper.getRequest(payload)
        .then((result) =>{ 
          let { message, error, response } = result;
         
          setProcessing(false);
          if (!error) {
            setShopDetailsResponse(result.response);
            
          } else {
            Alert.alert("Shop", message);
          }
  
        });
  
        
      } catch (error) {
        setProcessing(false);
        Alert.alert("Error", error.toString());
      }
    }

    const AddStock =() =>{
        navigation.navigate({
        name:'AddStock',
        params: { ShopID: ShopDetailsResponse.shopid },
        });
        // getCountriesApiServices().then((res)=>{
        //   console.log("ress")
        // })
        // .catch((err)=>{

        // })
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];
  const {fullname,memberid,msg,shop_lga,shop_street,shopid,shopname,stocks} = ShopDetailsResponse;
  let count = 0;
  return (
     
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {toggleNav} memberId = {"10000203445"} headerType = {"home"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <ScrollView style = {styles.BodyContainer} showsVerticalScrollIndicator={false}>

            <View>
                
                {processing?
                <View>
                    <ActivityIndicator size="large" color="#0C9344" />
                </View>: stocks && stocks.length>0?
                stocks.map((data)=>{
                
                return(<View style = {[styles.Card2,{flexDirection:'row',}]} key = {count+=1}>
                    
                    <View style = {{marginRight:10,paddingLeft:10,justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={()=>console.log("")}
                            // disabled={processing}
                            style={{}}
                        >
                            <Image
                                source = {ShopImage}
                                size = {200}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style = {{}}>
                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Product Name</Text>
                            <Text style = {styles.BoldText}>{data.productname}</Text>
                        </View>
                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Price</Text>
                            <Text style = {styles.BoldText}>{data.cost}</Text>
                        </View>

                        <View style = {{marginBottom:20,}}>
                            <Text style = {{marginBottom:8,}}>Quantity</Text>
                            <Text style = {styles.BoldText}>{data.qty}</Text>
                        </View>
                    </View>
                    
                </View>)})
                :<View><Text>No Stock Available</Text></View>
            }
            </View>   

                                   

            
            
        </ScrollView>
      {/* CardBody Ends */}

        
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor:'white',
  },
  headerContainer:{
    marginTop:40,
    marginBottom:20,
    // justifyContent:'',
    flexDirection:'row',
  },
  BodyContainer:{
    flex:1,
    backgroundColor:"white",

  },
  BoldText:{
    fontWeight:'bold',
    fontSize:15,

  },
    Card:{
    borderRadius:5,
    padding:20,
    height:200,
    marginTop:10,
    backgroundColor:"#97ADB6",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  Card2:{
    borderRadius:10,
    padding:10,
    height:200,
    marginTop:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderColor:'#979797',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth:1,
    elevation:2,
    // alignContent:'center',
    // alignItems:'center'
  },
});

export default Stocks;