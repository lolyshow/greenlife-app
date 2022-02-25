
import React from "react";
import { View, Text, StyleSheet,ScrollView,TouchableOpacity,Switch,Alert, Platform } from "react-native";
import {Avatar} from 'react-native-paper';
import SearchBar from "../../components/SearchBar";
import Clipboard from '@react-native-community/clipboard';
import ButtonComponent from "../../components/ButtonComponent";
import ToggleDrawerBtn from "../../components/ToggleDrawerBtn";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Helper from "../../Helpers/Helper";
export default class Home extends React.Component {
  // function Home(props){

  constructor(props) {
    super(props);
    this.state = {
      array: [
        {
          key: "1",
        },
      ],
      searchPhrase:"",
      clicked:false,
      searchString: "",
      copyToClipboard:"",
      isEnabled:false,
      linkUrl:"www.greelifetree.com-----------",
      referral:"",
      dashboard:{},
    };
  }

  componentDidMount() {
    this.fetchHomepage();
  }


   fetchHomepage =async()=>{
    try {

      console.log("insideTryLogin")
      this.setState({ processing: true });
      
      let payload = "backoffice/dashboard.jsp?memberid="+global.user.memberid+"&api";
      console.log("payloadHome", payload);
      await Helper.getRequest(payload)
      .then((result) =>{ 
        let { message, error, response } = result;
        console.log("MyResultStaysHererere",result.response)
        this.setState({ processing: false });
        console.log("myResponseInsideCallingMe "+response+" ResultTHen",result)
        if (!error) {
          console.log("myResponseInsideCall",response)
          this.setState({ dashboard : result.response });
          
        } else {
          Alert.alert("Home", message);
        }

      });

      
    } catch (error) {
      this.setState({ processing: false });
      Alert.alert("Error", error.toString());
    }
  }

  setSearchPhrase = (searchPhrase) =>{
    this.setState({searchPhrase})
  }

  setClicked =(clicked)=>{
    this.setState({clicked});
  }

   copyToClipboard = (linkUrl) => {
    Clipboard.setString("linkUrl");
  };

  fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    this.setState({copyToClipboard:text})
  };


   toggleSwitch = () => {
     if(this.state.isEnabled){
      this.setState(({isEnabled : false}))
     }else{
      this.setState(({isEnabled : true}))
     }
    }
    toggleNav = () =>{ console.log("navToggled");   this.props.navigation.openDrawer()}

    CommissionCard =(title)=>{

      const {dashboard} = this.state;
      let amount = 0;
      console.log("ThisIsMyDashboardTotalEarnednewme",this.state.dashboard.total_earned);
      if(dashboard){
        if(title == "Total Earned"){
          amount = dashboard.total_earned;
        }else if(title == "Total Withdrawn"){
          amount = dashboard.total_withdraw;
        }else{
          amount = 0.0
        }
      }else{
        amount = 0.0
      }
      console.log("thisIsMyAmount",amount)
      return(
        <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF'}]}>
          <Text style = {{color:'#0C9344',fontSize:18, margin:10,fontWeight:'bold'}}>{title}</Text>
          <Text style = {{color:'#0C9344',fontSize:25,fontWeight:'bold'}}>{amount}</Text>

          <View style = {{flexDirection:'row',justifyContent:'center',padding:20}}>

            <Text style = {{color:'#0C9344',fontSize:12}}>---------------------------</Text>
            
          </View>
        </View>
      );
    }

    RefferalSmallCard = (title,value)=>{
      return (
        <View style = {styles.totalReferal}>
          <Text style = {[styles.textCenter,{color:'#0C9344',}]}>{title}</Text>
          
          <Text style = {[styles.textCenter,{color:'#0C9344',fontSize:12}]}>{value}</Text>
        </View>
      );
    }


  render(){
    console.log("mydataLogsHere",this.state.dashboard);
    const {first,referral,total_withdraw,total_withdraw_naira,total_stocks,total_views,referral_shop,shopname,shopid,balance} = this.state.dashboard;
    // const {dashboard} = this.state.dashboard;
  return (
    <View style={styles.container}>

      {/* header Starts */}
      <View style = {styles.headerContainer}>
        <View>
          {/* <Text onPress = {this.toggleNav}>LeftIcon</Text> */}
          <ToggleDrawerBtn 
            onPress = {this.toggleNav}
          />
        </View>
        
        <View>
          <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
          <Text style = {{textAlign:'center'}}>{global.user.memberid?global.user.memberid:"202012340005"}</Text>
        </View>

        <View>
          <Avatar.Image 
              source={require('../../assets/avatar2.jpg')}
              size={40}
          />
        </View>

      </View>
      {/* Header Container Ends */}
      
      <View>
        <Text style = {styles.boldText}>Good Morning {first?first:"User"}</Text>
        
        <Text style = {{fontSize:12, color:"#979797"}}>How are you feeeling today?</Text>
      </View>
      
      <View >

        <SearchBar
          searchPhrase={this.state.searchPhrase}
          setSearchPhrase={(text) => this.setSearchPhrase(text)}
          clicked={this.state.clicked}
          setClicked={(clicked) => this.setClicked(clicked)}
        />
      </View>

      <ScrollView style = {styles.innerContainer}>
        <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
          <View style = {{justifyContent:'center'}}>
            <Text style = {styles.boldText}>Referral Panel</Text>
          </View>

          <View style = {{flexDirection:'row'}}>
            {/* onclick Copy Starts */}
            
              <TouchableOpacity onPress={this.copyToClipboard(this.state.linkUrl)} style = {{borderColor:"#0C9344",borderWidth:1,borderRadius:5,padding:3,width:140}}>
                <ScrollView horizontal={true}>
                  <Text style = {{fontSize:12, color:"#979797"}}>{referral?referral:"......"}</Text>
                </ScrollView>
              </TouchableOpacity>
            
            <TouchableOpacity onPress={this.copyToClipboard(this.state.linkUrl)} >
              <View style = {{padding:3,color:'#0C9344'}}>
                <FontAwesome name="content-copy" size = {20} color = {"#0C9344"}/>
              </View>
            </TouchableOpacity>

            {/* onclick Copy Ends */}
          </View>
        </View>
        {/* header Ends */}

        <View>
          <View style = {{flexDirection:'row', margin:10,marginTop:15,marginLeft:0}}> 
            <Switch
              trackColor={{ false: "#f0f0f0", true: "" }}
              thumbColor={this.state.isEnabled ? "#c0c0c0" : "#c0c0c0"}
              ios_backgroundColor="#FFFFFF"
              borderColor = "#adadad"
              borderWidth = {1}
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
            />

            <View style = {{justifyContent:'center', marginLeft:10,}}>
              <Text>Show in Naira</Text>
            </View>
          </View>
        </View>


        <View >
          <ScrollView style = {styles.upperScrollView} horizontal={true} showsHorizontalScrollIndicator={false} bouncesZoom={true} showsVerticalScrollIndicator={true}>
            <View style = {styles.innerScrollView}>
              <Text style = {{color:'#FFFFFF',fontSize:18, margin:10,fontWeight:'bold'}}>E-Wallet</Text>
              <Text style = {{color:'#FFFFFF',fontSize:25,fontWeight:'bold'}}>{balance?balance:'0.00'}</Text>

              <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>

                <View style = {{marginRight:10}}>
                  <View>
                    <ButtonComponent
                        textinput="Deposit"
                        buttonWidth={90}
                        onPress={() => this.submitForm()}
                        size ={"sm"}
                        backgroundColor = {"#0C9344"}
                        borderRadius = {8}
                        textColor={"#FFFFFF"}
                        borderWidth = {1}
                        borderColors = {"#FFFFFF"}

                    />
                  </View>
                </View>

                <View style = {{}}>
                  <ButtonComponent
                      buttonWidth={90}
                      textinput="Withdrawal"
                      onPress={() => this.submitForm()}
                      size ={"sm"}
                      backgroundColor = {"#FFFFFF"}
                      borderRadius = {8}
                      textColor={"#0C9344"}
                      borderColors = {"#FFFFFF"}

                  />
                </View>
              </View>
            </View>

            
            {this.CommissionCard("Total Withdrawn")}
            

            {this.CommissionCard("Total Earned")}
            
            <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',flexDirection:'row',padding:20,marginLeft:10}]}>
              <View style={{flex:1}}>
                <Text style = {{color:'#0C9344',fontSize:20,fontWeight:'bold'}}>{"Total Referrals"}</Text>
                <Text style = {{color:'#0C9344',fontSize:25,fontWeight:'bold'}}>{"52"}</Text>
              </View>

              <View style = {{margin:10}}>
                

                {this.RefferalSmallCard("Total A-Side","0")}

                {this.RefferalSmallCard("Total B-Side","0")}
                
              </View>


              
            </View>

            
          </ScrollView>

          <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
              <View style = {{justifyContent:'center'}}>
                <Text style = {styles.boldText}>My E-shop</Text>
              </View>

              <View style = {{flexDirection:'row'}}>
                {/* onclick Copy Starts */}
                <TouchableOpacity onPress={this.copyToClipboard(this.state.linkUrl)} style = {{borderColor:"#0C9344",borderWidth:1,borderRadius:5,padding:3,width:140}}>
                  <ScrollView horizontal={true}>
                    <Text style = {{fontSize:12, color:"#979797"}}>{this.state.linkUrl}</Text>
                  </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity /*onPress={this.copyToClipboard(this.state.linkUrl)*/ >
                  <View style = {{padding:3,color:'#0C9344'}}>
                    <FontAwesome name="content-copy" size = {20} color = {"#0C9344"}/>
                  </View>
                </TouchableOpacity>
                {/* onclick Copy Ends */}
              </View>
          </View>
        </View>


        <ScrollView style = {styles.upperScrollView} horizontal={true} showsHorizontalScrollIndicator={false}  bouncesZoom={true} showsVerticalScrollIndicator={true}>
          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Entypo name="shop" size = {50} color = {"#0C9344"}/>
            <Text style = {{fontSize:18, margin:10,fontWeight:'bold'}}>{shopid?shopid:"....."}</Text>
            <Text style = {{fontSize:14,}}>{shopname?shopname:"....."}</Text>

            
          </View>

          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Text style = {{fontSize:14, margin:10,}}>Total Stocks</Text>
            <Text style = {{fontSize:25,fontWeight:'bold'}}>{total_stocks?total_stocks:"...."}</Text>
              <View style = {{margin:10}}>
                <ButtonComponent
                  buttonWidth={100}
                  textinput="Withdrawal"
                  onPress={() => this.submitForm()}
                  size ={"sm"}
                  backgroundColor = {"#1976D2"}
                  borderRadius = {2}
                  textColor={"#FFFFFF"}
                  borderColors = {"#FFFFFF"}

                />
              </View>
          </View>

          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Text style = {{fontSize:14, margin:10,}}>Total Views</Text>
            <Text style = {{fontSize:25,fontWeight:'bold'}}>{total_views?total_views:"....."}</Text>
            <Text style = {{fontSize:25,fontWeight:'bold',color:'#0C9344'}}>----------</Text>
          </View>

        </ScrollView>

      </ScrollView>
    </View>
  )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    paddingTop:0,
    // marginTop:Platform.OS = "android"? 
    backgroundColor:Platform.OS == "android"?"#f8f8f8":null
  },
  headerContainer:{
    marginTop:Platform.OS == "android"?10:40,
    marginBottom:20,
    justifyContent:'space-between',
    flexDirection:'row',
  },
  boldText:{
    fontSize:15,
    fontWeight:'bold',
    flexDirection:'row',
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  textCenter:{fontSize:12,textAlign:'center'},
  totalReferal:{width:100, height:50,borderColor:"#0C9344",borderWidth:1,borderRadius:3,justifyContent:'center',marginTop:10,},
  upperScrollView:{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',shadowOpacity: 0.9,elevation:1},
  innerScrollView:{flex:1, padding:10,paddingBottom:50, alignItems:'center', margin:10, borderRadius:20, backgroundColor:'#0C9344',width:260,height:150,marginTop:20, marginRight:20,shadowOffset: {width: 10, height: 10},
    shadowColor: '#d9dbda',
    shadowOpacity: 0.9,}
});
