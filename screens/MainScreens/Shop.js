import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Image } from "react-native";
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
import { useSelector } from "react-redux";

const Shop = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ShopDetailsResponse, setShopDetailsResponse] = useState({});
    const {name,memberid} = useSelector((state) => state.appReducer.userDetails.response);
    useEffect(() => {
      fetchShopDetails()
    },[]);

    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const toggleNav = () =>{navigation.openDrawer()}

    const setClickedFunc = (action) =>{
        setClicked(action)
    }


    const fetchShopDetails =async()=>{
      try {
  
        setProcessing(true);
        
        let payload = "backoffice/shop_details.jsp?memberid="+memberid+"&api";
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
        // })
        // .catch((err)=>{

        // })
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];
  const {fullname,msg,shop_lga,shop_street,shopid,shopname} = ShopDetailsResponse;
  return (
     
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {toggleNav} memberId = {"10000203445"} headerType = {"home"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <ScrollView style = {styles.BodyContainer} showsVerticalScrollIndicator={false}>

            <View>
                <View style = {styles.Card}>
                    <Text style = {{fontWeight:'bold', fontSize:20}}>Hello, {processing?"........":fullname?fullname:"......"}</Text>
                    <Text style = {{fontSize:12}}>Welcome to your e-shop summary dashboard.</Text>

                    <Text style = {{marginTop:10,fontSize:12}}>GTPS provides a market-place platform designed to enable the meeting point between business owners, eg service providers, retailers and prospective clients or buyers.

                    </Text>
                    
                    <Text style = {{marginTop:10,fontSize:12}}>For easy implementation, we are piloting this service in Nigeria first.</Text>
                </View>

                {/* <View>

                    <Text style = {{fontWeight:'bold', fontSize:20,marginTop:40,marginBottom:40}}>Withdrawal Report</Text>
                </View> */}

                <View style = {[styles.Card2,{marginTop:20,flexDirection:'row',}]}>

                    <View style = {{marginRight:20,paddingLeft:20,justifyContent:'center'}}>
                        <Image
                            source = {ShopImage}
                            size = {200}
                        />
                    </View>

                    <ScrollView style = {{}} showsVerticalScrollIndicator={false}>
                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Shop Number</Text>
                            <Text style = {styles.BoldText}>{shopid?shopid:"......."}</Text>
                        </View>
                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Shop Number</Text>
                            <Text style = {styles.BoldText}>{shop_street?shop_street:"......."}</Text>
                        </View>

                        <View style = {{marginBottom:20}}>
                            <Text style = {{marginBottom:8,}}>Shop Street</Text>
                            <Text style = {styles.BoldText}>{shop_lga?shop_lga:"........"}</Text>
                        </View>
                    </ScrollView>
                    
                </View>

                <View style = {{marginTop:25,}}>
                    <Text style = {[styles.BoldText,{alignSelf:'center'}]}>Its time to start adding to your stocks!!!</Text>
                </View>

                <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <View style={{justifyContent:'center',marginTop:20}}>
                        <ButtonComponent
                            textinput="Click here to add stock"
                            buttonWidth={250}
                            onPress={AddStock}
                            // size ={"sm"}
                            boldText = {"bold"}
                            backgroundColor = {"#0C9344"}
                            borderRadius = {16}
                            textColor={"#FFFFFF"}
                            borderWidth = {1}
                            borderColors = {"#FFFFFF"}

                        />
                        
                    </View>
                </View>
               
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
    padding:15,
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
    height:220,
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
    height:250,
    marginTop:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderColor:'#979797',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // alignContent:'center',
    // alignItems:'center'
  },
});

export default Shop;