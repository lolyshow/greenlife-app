import React, { Component,useState } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,Text,TouchableOpacity,ScrollView,ActivityIndicator
} from "react-native";
import Helper from "../../Helpers/Helper";
import ButtonComponent from "../../components/ButtonComponent";
import { FlatGrid } from "react-native-super-grid";
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);
// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

// import Logo from "../../assets/logo2.png";
import Logo from "../../assets/store.png";
import StoreCard from "../../components/StoreCard";
import { store } from "../../redux/store";
import EcommerceHeader from "../../components/EcommerceHeader";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  StatusBar: {
    color: "white",
  },
   Card:{
    borderRadius:5,
    padding:20,
    height:200,
    marginTop:10,
    marginBottom:20,
    backgroundColor:"#97ADB6",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  boxStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
  }
});

export default class Stores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      storedCredentials: "",
      appReady: false,
      detailsResponse:null,
      processing:false,
      searchPhrase:"",
      clicked:false,
      searchString: "",
      stores:""
      
    };
  }

  componentDidMount() {
    global.gotoStore = null;
    this.fetchStoreDetails();
    
  }

  
  submitForm =()=>{
    console.log("myEmailIsKukuHere", global.gtpsUserData.email)
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
    
    this.props.navigation.navigate("Store"):
    this.props.navigation.navigate("Register");
    
    }
  }

  

  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };

  fetchStoreDetails =async()=>{

    const {email,password} = global.gtpsUserData;
    try {
      let body = {
        "email": email,
        "password": password,
        "btn-submit": "Admin-Login",
        "function":"client-login",
        "textMemberID": ' 202012340008',
        "param_type":"product",
        "page":"view_stores",
        "api":""
      }

      console.log("MemberIdLoghere",memberid)
      this.setState({processing:true});
      let memberid = "";
      if(this.props.route.params && this.props.route.params.memberid){
        memberid = this.props.route.params.memberid
      }else{
        memberid = global.usermemberid;
      }
      let payload = "view_stores.jsp?product="+memberid+"&api";
      console.log("payloadProuctsCat", payload);
      await Helper.Request(payload,"post",body)
      .then((result) =>{ 
        let { message, error, response } = result;
        console.log("myStoreResultis",response)
        this.setState({processing:false});
        this.setState({appReady:true});
        if (!error) {
          this.setState({appReady:true});
          this.setState({processing:false});
          this.setState({detailsResponse:result.response});
          this.setState({stores:result.response.stores});
          
        } else {
          Alert.alert("Shop", message);
        }

      });

      
    } catch (error) {
      this.setState({appReady:true});
      this.setState({processing:false});
      Alert.alert("Error", error.toString());
    }
  }

  onPressProduct =(shopid)=>{
    console.log("myData",shopid)
    this.props.navigation.navigate("MemberShop",{shopid})
  }
  

  onPressCall = () =>{

  }

  logout=()=>{

    global.gtpsUserData = null;
    global.loggedin = false;
    try{
        store.dispatch({
        type: "GTPS_USER_DATA",
        payload: null,
      });
    }
    catch(error){
      console.log("ErrorDey ForHieOh",error)
    }
    this.props.navigation.navigate("Products");
  }

  renderHeader=()=>{
    console.log("logmeHerere");
    return(
    
      <View style = {{backgroundColor:'#0C9344',padding:5}}>
        <EcommerceHeader loggedin = {global.loggedin} onpressLogout = {this.logout} onPress = {this.toggleNav} title = {"Store"} memberId = {"10000203445"} />
      </View>
    )
  }

  renderProductCard = () => {
    
    // ];
    
    let count = 0;
    let {stores} = this.state.detailsResponse;
    // console.log("insideCardStore",stores)
    let half = screenWidth-30;
    return (
      
      <FlatGrid
        itemDimension={half}
        data={stores}
        showsVerticalScrollIndicator={false}
        style={styles.gridView}
        renderItem={({ item }) => 
          (
            
            <StoreCard filepath ={item.filepath} shopname={item.gl_productname} address={item.shop_location} phone={item.phone} onPressCall={this.onPressCall.bind(this,item.phone)} onPressProduct = {this.onPressProduct.bind(this,item.memshopid)} count = {count+=1}/>
          )
         
        }
      />
      
    );
  };


  render() {
    let {detailsResponse,processing,appReady,stores} = this.state;
    console.log("myStoreDatasss",stores);
    return (
      
      <View style={styles.container}>
          {this.renderHeader()}
        <View>
            

          <View style = {{padding:20}}>
              {/* <View style = {styles.Card}>
                  <Text style = {{}}>Welcome to GTPS Online Stores </Text>

                  <Text style = {{marginTop:10,}}>We know our frustrating it is to need something but can't afford; and even more frustrating to have the means and not find exactly what you need. At GTPS, we need connect you to e-stores that will provide you with what you need..

                  </Text>
                  
              </View>

              <View><Text style = {{fontWeight:'bold',fontSize:20}}>Stores selling: Danshen Plus:</Text></View>
               */}
              {processing?(<View style={{justifyContent:'center',alignContent:'center',marginTop:20}}>

                <ActivityIndicator size="large" color="#0C9344" />
                <Text style={{textAlign:'center'
                }}>Loading, Please wait......</Text>
                </View>):null}  


              {appReady && detailsResponse!= null ?
            
          
                (<View style ={{}}>
                    {this.renderProductCard()}
                </View>)

                :null

              }
              

              {appReady && stores.length==0?
                (<View style={{justifyContent:'center',alignContent:'center',marginTop:20}}>

                  
                  <Text style={{textAlign:'center'
                  }}>There seems to be an error loading this product details. Please try again later. Thank you</Text>
                </View>):null}
          </View>
        </View>
      </View>
    );
  }
}