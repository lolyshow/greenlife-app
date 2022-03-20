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
import { connect } from "react-redux";
import { handlesaveuserAuth, handleUpdateUserLoggedIn } from "../../reduxx/actions/requests";
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
    // flex: 2,
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
    // console.log("component Launched");
    this.renderHeader();
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
    let half = (screenWidth/2)-30;
    return (
      <View style={{
        justifyContent:'center',
        alignContent:'center'
      }}>
      <FlatGrid
        itemDimension={half}
        data={stocks}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.gridView}
        renderItem={({ item }) => 
          (
            <Productcard filepath = {item.filepath} desc ={item.desc} submitForm = {this.submitForm.bind(this,item.glprodid?item.glprodid:null)} cost={item.cost} productname={item.productname} btn_txt ={"View Store"}  onpressText = {this.onpressText()}  count = {count+=1}/>
            )
         
        }
      />
      </View>
      
    );
  };
  
  onSwipePerformed = (action) => {
    switch (action) {
      
      default: {
        this.gotToNextScreen();
      }
    }
  };

  toggleNav=()=>{
    this.props.navigation.goBack()
     console.log("thisIsProps",this.props.navigation.navigate)
   }

   logout =()=>{
    this.props?.dispatch(handleUpdateUserLoggedIn(false))
    this.props?.dispatch(
      handlesaveuserAuth({
        email:"",
        password:""
      })
    )
   } 
  renderHeader=()=>{
    const {userLoggedIn} = this.props;
    return(
    
      <View style = {{backgroundColor:'#0C9344',padding:5}}>
        <EcommerceHeader loggedin = {userLoggedIn} onpressLogout = {this.logout} onPress = {this.toggleNav} title = {"Products"} memberId = {"10000203445"} />
      </View>
    )
  }
  
  render() {
    console.log("myDetalsResponsePProductsPage",this.state.detailsResponse);
    let {detailsResponse} = this.state;
    let count = 0;
    
    console.log("currentUser",this.props.currentUser);
    return (
        
        
        <View style={styles.container}>
            {this.renderHeader()}

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

const mapStateToProps = (state) => {
  return { 
    currentUser: state.authReducer.currentUser,
    userLoggedIn:state.authReducer.userLoggedIn
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch, 
});

export default connect( mapStateToProps, mapDispatchToProps)(Products)