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
// import { store } from "../redux/store";

// import logoWatermark from "../assets/logoWatermark.png";

// import Logo from "../../assets/logo2.png";
import Logo from "../../assets/chitomeal.png";
// import { Consumer } from "react-native-paper/lib/typescript/core/settings";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  StatusBar: {
    color: "white",
  },
});

export default class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      storedCredentials: "",
      appReady: false,
      detailsResponse:null,
      processing:false
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
    {global.gtpsUserData !=undefined && global.gtpsUserData!=null?
    this.props.navigation.navigate("Stores"):
    this.props.navigation.navigate("Register");
    
    }
  }

  productCard =(productname,desc,filepath,memshopid,id)=>{
    console.log("thisKey",id)
    return(
      <View style = {{padding:20}} key={id}>
                
        <View style={{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',elevation:2,borderColor:'black',shadowOpacity: 0.9,padding:10}}>
            <TouchableOpacity onPress={()=>console.log("pressed!!!")} >
                <View style ={{alignSelf:'center'}}>
                    <Image resizeMode="contain" style = {{width: 100, height: 100,}}  source={{uri:filepath}} />
                </View>
            </TouchableOpacity>
            <View>
                <Text style={{fontSize:20,fontWeight:'bold',}}>{productname}</Text>
                <Text>{desc}
                    <Text style = {{backgroundColor:"#5cb85c",color:"#FFFFFF"}} onPress={()=>console.log("you pressed me!!")}>View Details</Text>
                </Text>
            </View>



            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>

              <View >
                  {/* <Text>herer</Text> */}
              </View>

                <View style={{paddingTop:20}}>
                  <ButtonComponent
                  textinput="View Stores"
                  buttonWidth={90}
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
                
          <ScrollView>
            
          {detailsResponse!= null ?
            
            (detailsResponse.stocks.map((data)=>{
              console.log("mudataInloop",data)
              
              
              return(this.productCard(data.productname,data.desc,data.filepath,data.memshopid,count+=1))
            })
              

            ):
            <View style={{justifyContent:'center',alignContent:'center',marginTop:20}}>

              <ActivityIndicator size="large" color="#0C9344" />
            </View>

          }
            
          </ScrollView>
        </View>
    );
  }
}
