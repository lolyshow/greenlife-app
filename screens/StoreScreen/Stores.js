import React, { Component,useState } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,Text,TouchableOpacity,ScrollView,ActivityIndicator,Linking
} from "react-native";
import Helper from "../../Helpers/Helper";
import ButtonComponent from "../../components/ButtonComponent";
import { FlatGrid } from "react-native-super-grid";
import { StackActions } from '@react-navigation/native';
  let currency = require('currency.js');
  const NGN = value => currency(value, {precision: 0, symbol: 'N'});
const screenWidth = Math.round(Dimensions.get("window").width);

const screenHeight = Math.round(Dimensions.get("window").height);
// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

// import Logo from "../../assets/logo2.png";
import Logo from "../../assets/store.png";
import StoreCard from "../../components/StoreCard";
import { store } from "../../redux/store";
import EcommerceHeader from "../../components/EcommerceHeader";
import { connect } from "react-redux";
import { handleGotoStore, handlesaveuserAuth, handleUpdateUserLoggedIn } from "../../reduxx/actions/requests";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
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

class Stores extends Component {

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

    if(!this.props.userLoggedIn){
      this.props.navigation.dispatch(StackActions.popToTop());
    }

    this.props?.dispatch(
      handleGotoStore({
        memberid:null,
        gotoStore:false
      })
    )

    


    global.gotoStore = null;
    this.fetchStoreDetails();
    
  }

  
  submitForm =()=>{
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

    const {email,password} = this.props?.currentUser
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


      this.setState({processing:true});
      let memberid = "";
      if(this.props.route.gotoStore && this.props.route.memberid){

        memberid = this.props.route.memberid

        this.props?.dispatch(
          handleGotoStore({
            memberid:null,
            gotoStore:false
          })
        )
      }
      else if(this.props.route.params.memberid){

        memberid = this.props.route.params.memberid
      }
      else{
        memberid = global.usermemberid;
      }
      let payload = "view_stores.jsp?product="+memberid+"&api";
      await Helper.Request(payload,"post",body)
      .then((result) =>{ 

        
        let { message, error, response } = result;
        console.log(response);
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
    this.props.navigation.navigate("MemberShop",{shopid})
  }
  

  


    logout =()=>{
      // this.props.navigation.navigate("Products");
      this.props?.dispatch(handleUpdateUserLoggedIn(false))
      this.props?.dispatch(
        handlesaveuserAuth({
          email:"",
          password:""
        })
      )

      this.props.navigation.goBack()
      // this.props.navigation.navigate("ContinueToStoreStack")
      // return 
     } 

    //

    toggleNav=()=>{
      this.props.navigation.goBack()
       
     }
  

  renderHeader=()=>{
    const {userLoggedIn} = this.props;
    // let stores = [];
    let stores = this.state.detailsResponse?.stores?this.state.detailsResponse.stores:[];
    return(
    
      <View style = {{backgroundColor:'#0C9344',padding:5}}>
        <EcommerceHeader loggedin = {userLoggedIn} onpressLogout = {this.logout} onPress = {this.toggleNav} title = {stores.length>0?stores[0].gl_productname+" Stores":"Stores"} memberId = {"10000203445"} />
      </View>
    )
  }
  callOut = (phoneNumber) =>{
    
    Linking.openURL(`tel:${phoneNumber}`)
  }

  renderProductCard = () => {
    
    // ];
    
    let count = 0;
    let {stores} = this.state.detailsResponse;
    let half = screenWidth-30;
    return (
      
      <FlatGrid
        itemDimension={half}
        data={stores}
        showsVerticalScrollIndicator={false}
        style={styles.gridView}
        renderItem={({ item }) => 
          (
            
            <StoreCard filepath ={item.filepath} shopname={item.shopname} address={item.shop_location} phone={item.phone} onPressCall={this.callOut.bind(this,item.phone)} onPressProduct = {this.onPressProduct.bind(this,item.memshopid)} count = {count+=1}/>
          )
         
        }
      />
      
    );
  };


  render() {
    let {detailsResponse,processing,appReady,stores} = this.state;
    return (
      
      <View style={styles.container}>
          {this.renderHeader()}
        <View>
            

          <View style = {{padding:20}}>
              
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

const mapStateToProps = (state) => {
  return { 
    currentUser: state.authReducer.currentUser,
    userLoggedIn:state.authReducer.userLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch, 
});

export default connect( mapStateToProps, mapDispatchToProps)(Stores)