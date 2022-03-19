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

const screenHeight = Math.round(Dimensions.get("window").height);
import { FlatGrid } from "react-native-super-grid";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { FlatList } from "react-native-gesture-handler";
import Productcard from "../../components/ProductCard";
import EcommerceHeader from "../../components/EcommerceHeader";
// import { Consumer } from "react-native-paper/lib/typescript/core/settings";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:100,
  },
  StatusBar: {
    color: "white",
  },
  gridView: {
    // margin: 10,
    // flex: 1,
  },
});

class Products extends React.Component {

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

  componentDidMount() {
    this.fetchShopDetails();
  }

  fetchShopDetails =async()=>{
    try {

      console.log("insideTryLogin")
      this.setState({processing:true});
      
      let payload = "UsersControllerServet?action=Pager&flag=first&initial=21&step=2&api";
      console.log("payloadShop", payload);
      await Helper.getRequest(payload)
      .then((result) =>{ 
        let { message, error, response } = result;
      
        this.setState({processing:false});
        if (!error) {
          this.setState({detailsResponse:result.response});
          
        } else {
          Alert.alert("Shop", message);
        }

      });

      
    } catch (error) {
      this.setState({processing:false});
      Alert.alert("Error", error.toString());
    }
  }
  
  submitForm =(memberid)=>{
    console.log("MyAwesomeMemberId",memberid)
    //console.log("MyNav",this.props.navigation.getParent)
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
      
    this.props.navigation.navigate("Stores", {memberid}
    ):(global.gotoStore= true, global.usermemberid = memberid, this.props.navigation.navigate("UserAuth"))
    
    }
  }

  setClicked =(clicked)=>{
    this.setState({clicked});
  }
  setSearchPhrase = (searchPhrase) =>{
    this.setState({searchPhrase})
  }

  

  onpressText(data){
    console.log("mdddt",data);
  }

  


  renderProductCard = () => {
    
    let count = 0;
    let {stocks} = this.state.detailsResponse;
    
    return (
      
      <FlatGrid
        itemDimension={200}
        data={stocks}
        style={styles.gridView}
        renderItem={({ item }) => 
          (
            <Productcard filepath = {item.filepath} desc ={item.desc} submitForm = {this.submitForm.bind(this,item.glprodid?item.glprodid:null)} cost={item.cost} productname={item.productname} btn_txt ={"View Store"}  onpressText = {this.onpressText()}  count = {count+=1}/>
            )
         
        }
      />
      
    );
  };


   toggleNav=()=>{
     this.props.navigation.goBack()
      console.log("thisIsProps",this.props.navigation.navigate)
    }
  
  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };
  render() {
    console.log("myDetalsResponsePProductsPage",this.state.detailsResponse);
    let {detailsResponse} = this.state;
    let count = 0;
    return (
        
        <View style={styles.container}>
          <View style = {{backgroundColor:'#0C9344',paddingLeft:20}}>
            <EcommerceHeader onPress = {this.toggleNav} title = {"Products"} memberId = {"10000203445"} />
          </View>

            <View style = {{padding:20,paddingBottom:0}}>

              <SearchBar
                searchPhrase={this.state.searchPhrase}
                setSearchPhrase={(text) => this.setSearchPhrase(text)}
                clicked={this.state.clicked}
                setClicked={(clicked) => this.setClicked(clicked)}
                searchPlaceHolder = "Choose product to search for"
              />
            </View>    
          <View>
          {detailsResponse!= null ?
            
          
            (<View style ={{}}>
                {this.renderProductCard()}
            </View>)

            :(<View style={{justifyContent:'center',alignContent:'center',marginTop:20}}>

              <ActivityIndicator size="large" color="#0C9344" />
              <Text style={{textAlign:'center'
              }}>Loading, Please wait......</Text>
            </View>)

          }
          
          </View>
        </View>
    );
  }
}

export default Products;