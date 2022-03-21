import React, { Component,useState } from "react";

import {
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
  View,Alert,Text,TouchableOpacity,ScrollView,ActivityIndicator,
} from "react-native";
import Helper from "../../Helpers/Helper";
import ButtonComponent from "../../components/ButtonComponent";
const screenWidth = Math.round(Dimensions.get("window").width);
import { StackActions } from '@react-navigation/native';
const screenHeight = Math.round(Dimensions.get("window").height);
import { FlatGrid } from "react-native-super-grid";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import Productcard from "../../components/ProductCard";
import EcommerceHeader from "../../components/EcommerceHeader";
import { connect } from "react-redux";
import { handlesaveuserAuth, handleUpdateUserLoggedIn } from "../../reduxx/actions/requests";
// import { Consumer } from "react-native-paper/lib/typescript/core/settings";

let applyWith = screenWidth/1.2;
let applyHeight = screenHeight/3;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:100,
  },
  StatusBar: {
    color: "white",
  },
  gridView: {
    
  },
  shadowProp: {
     shadowOffset: {width: 10, height: 10},alignItems:'center', alignSelf:"center", borderRadius:3, shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:applyWith,marginTop:20,height:applyWith,
    justifyContent:'center'
    },
    bodyContainer:{
        // width:applyWith,
        padding:10,
        // alignSelf:'center'
    },
    
});

class ProductDetails extends React.Component {

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
    };
  }

  



  

  onpressText(data){
  }

  



  toggleNav=()=>{
    this.props.navigation.goBack()
   }

   logout =()=>{
    // this.props?.dispatch(handleUpdateUserLoggedIn(false))
    // this.props?.dispatch(
    //   handlesaveuserAuth({
    //     email:"",
    //     password:""
    //   })
    // )
    // console.log("hhhhhhhh")
        this.props.navigation.navigate("Products")
    // this.props.navigation.dispatch(StackActions.popToTop());
} 
  renderHeader=()=>{
    const {userLoggedIn} = this.props;
    return(
    
      <View style = {{backgroundColor:'#0C9344',padding:5}}>
        <EcommerceHeader loggedin = {userLoggedIn} onpressLogout = {this.logout} onPress = {this.toggleNav} title = {"Products Details"} memberId = {"10000203445"} />
      </View>
    )
  }
  
  render() {
    let {filepath} = this.props.route.params.data;
    let {data} = this.props.route.params;
    let {detailsResponse} = this.state;
    let count = 0;
    return (
        
        
        <View style={styles.container}>
            {this.renderHeader()}

               
          <View>
            <ScrollView style = {styles.bodyContainer}>
                <View elevation={1} style = {[styles.shadowProp]}>
                    <View style ={{alignSelf:'center',justifyContent:'center',alignContent:'center',alignItems:'center',}}>
                        <Image resizeMode="contain" style = {{width: applyHeight, height: applyHeight,}}  source={{uri:filepath}} />
                    </View>
                </View>
                <View style={{marginTop:20,marginBottom:30}}>   
                    {Object.entries(data).map((items,index)=>{
                        let title = items[0].toUpperCase();
                        if(title !="FILEPATH" && title!= "GL_PRODUCTNAME"){
                            return(<View style = {{flexDirection:'row',justifyContent:"space-between",marginTop:10}} key = {count+=1}>

                                <Text style={{fontSize:12,fontWeight:'bold'}}>{title}: </Text>
                                <Text style={{fontSize:12}}>{items[1]}</Text>
                            </View>)
                        }
                    })
                    }
                </View> 
            </ScrollView>
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

export default connect( mapStateToProps, mapDispatchToProps)(ProductDetails)