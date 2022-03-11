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
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
    this.props.navigation.navigate("Stores",{
      memberid
    }):
    this.props.navigation.navigate("Register");
    
    }
  }

  setClicked =(clicked)=>{
    this.setState({clicked});
  }
  setSearchPhrase = (searchPhrase) =>{
    this.setState({searchPhrase})
  }

  productCard =(productname,desc,filepath,memshopid,id)=>{
    console.log("thisKey",id)
    return(
      <View style = {{padding:20,}} key={id}>
                
        

        <View style={{justifyContent:"center", shadowOffset: {width: 10, height: 10}, borderRadius:10, shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10,width:160}}>
          <View style={{justifyContent:'space-between',flexDirection:'row'}}>
            <Text style = {{fontSize:12,color:'#0C9344'}}>Stock Status:</Text>
            <View style = {{borderRadius:10,backgroundColor:"#d9dbda",width:70}}>
              <Text style = {{fontSize:12,textAlign:'center'}}>Available</Text>
            </View>
          </View>
          <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
              <View style ={{alignSelf:'center',justifyContent:'center'}}>
                  <Image resizeMode="contain" style = {{width: 100, height: 100,}}  source={{uri:filepath}} />
              </View>
          </TouchableOpacity>
          <View style={{justifyContent:'center'}}>
              
              
              <Text numberOfLines={3} style={{fontSize:12}}>fhskdhshdklshdkshdlkshdkhslhsklhdlhsldskdlkhdkhlhsdklhdkls
              {desc}
                  <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF", fontSize:12}} onPress={()=>console.log("you pressed me!!")}>View Details</Text>
              </Text>
              <Text style={{fontSize:15,fontWeight:'bold'}}>{productname}</Text>
              <Text style={{fontSize:15,fontWeight:'bold'}}>{"\u20A6"}40000</Text>
          </View>



          <View style = {{ justifyContent:"center"}}>

            

            <View style={{paddingTop:20,alignItems:'center'}}>
              <ButtonComponent
                textinput="View Stores"
                buttonWidth={120}
                onPress={() => this.submitForm(memshopid)}
                size ={"sm"}
                backgroundColor = {"#337ab7"}
                borderRadius = {8}
                textColor={"#FFFFFF"}
                borderWidth = {1}
                borderColors = {"#FFFFFF"}

              />
            </View>


              

          </View>

            
        </View>
      </View>
    );
  }

  onpressText(data){
    console.log("mdddt",data);
  }

  


  renderProductCard = () => {
    
    // ];
    
    let count = 0;
    let {stocks} = this.state.detailsResponse;
    
    
    return (
      
      <FlatGrid
        itemDimension={118}
        data={stocks}
        style={styles.gridView}
        renderItem={({ item }) => 
          (
            <Productcard filepath = {item.filepath} desc ={item.desc} productname={item.productname} btn_txt ={"View Store"} onpressText = {this.onpressText()}  count = {count+=1}/>
            
           
          )
         
        }
      />
      
    );
  };

  
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