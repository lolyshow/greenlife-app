
import React from "react";
import { View, Button, Text, StyleSheet,ScrollView,TouchableOpacity,Switch } from "react-native";
import SearchBar from "../../components/SearchBar";
import Clipboard from '@react-native-community/clipboard';
import { color } from "react-native-reanimated";
import GreenButton from "../../components/GreenButton";
import WhiteButton from "../../components/WhiteButton";
import ButtonComponent from "../../components/ButtonComponent";
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
      linkUrl:"www.greelifetree.com",
    };
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


  render(){

    
  return (
    <View style={styles.container}>

      {/* header Starts */}
      <View style = {styles.headerContainer}>
        <View>
          <Text>LeftIcon</Text>
        </View>
        
        <View>
          <Text style = {{fontSize:12, color:"#979797",textAlign:'center'}}>Member ID</Text>
          <Text style = {{textAlign:'center'}}>202012340008</Text>
        </View>

        <View>
          <Text>right Text</Text>
        </View>

      </View>

      
      <View>
        <Text style = {styles.boldText}>Good Morning Josiah</Text>
        
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
            <TouchableOpacity /*onPress={this.copyToClipboard(this.state.linkUrl)*/ style = {{borderColor:"#0C9344",borderWidth:1,borderRadius:5,padding:3,}}>
              <Text>{this.state.linkUrl}</Text>
            </TouchableOpacity>
            
            <View style = {{padding:3,color:'#0C9344'}}>
              <Text>copy</Text>
            </View>

            {/* onclick Copy Ends */}
          </View>
        </View>
        {/* header Ends */}

        <View>
          <View style = {{flexDirection:'row', margin:10,marginTop:15,marginLeft:0}}> 
            <Switch
              trackColor={{ false: "#FFFFFF", true: "" }}
              thumbColor={this.state.isEnabled ? "#c0c0c0" : "#c0c0c0"}
              ios_backgroundColor="#FFFFFF"
              borderColor = "#cecbcb"
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
          <ScrollView style = {styles.upperScrollView} horizontal={true} bouncesZoom={true} showsVerticalScrollIndicator={true}>
            <View style = {styles.innerScrollView}>
              <Text style = {{color:'#FFFFFF',fontSize:18, margin:10,fontWeight:'bold'}}>E-Wallet</Text>
              <Text style = {{color:'#FFFFFF',fontSize:25,fontWeight:'bold'}}>$118.00</Text>

              <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>

                <View style = {{margin:10}}>
                  <View>
                    <ButtonComponent
                        textinput="Deposit"
                        buttonWidth={100}
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

                <View style = {{margin:10,}}>
                  <ButtonComponent
                      buttonWidth={120}
                      textinput="Withdrawal"
                      onPress={() => this.submitForm()}
                      size ={"sm"}
                      backgroundColor = {"#FFFFFF"}
                      borderRadius = {8}
                      textColor={"#0C9344"}

                  />
                </View>
              </View>
            </View>


            <View style = {{flex:1, padding:10, alignItems:'center', margin:10, borderRadius:20, backgroundColor:'#0C9344',width:260,height:160,marginTop:20, marginRight:20}}>
              <Text style = {{color:'#FFFFFF',fontSize:18, margin:10,fontWeight:'bold'}}>E-Wallet</Text>
              <Text style = {{color:'#FFFFFF',fontSize:25,fontWeight:'bold'}}>$118.00</Text>

              <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>

                <View style = {{margin:10}}>
                  <View>
                    <ButtonComponent
                        textinput="Withdrawal"
                        buttonWidth={100}
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

                <View style = {{margin:10,}}>
                  <ButtonComponent
                      buttonWidth={120}
                      textinput="Withdrawal"
                      onPress={() => this.submitForm()}
                      size ={"sm"}
                      backgroundColor = {"#FFFFFF"}
                      borderRadius = {8}
                      textColor={"#0C9344"}

                  />
                </View>
              </View>
            </View>


           

            
          </ScrollView>

          <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
              <View style = {{justifyContent:'center'}}>
                <Text style = {styles.boldText}>My E-shop</Text>
              </View>

              <View style = {{flexDirection:'row'}}>
                {/* onclick Copy Starts */}
                <TouchableOpacity /*onPress={this.copyToClipboard(this.state.linkUrl)*/ style = {{borderColor:"#0C9344",borderWidth:1,borderRadius:5,padding:3,}}>
                  <Text>{this.state.linkUrl}</Text>
                </TouchableOpacity>
                
                <View style = {{padding:3,color:'#0C9344'}}>
                  <Text>copy</Text>
                </View>

                {/* onclick Copy Ends */}
              </View>
            </View>
        </View>


        <ScrollView style = {styles.upperScrollView} horizontal={true} bouncesZoom={true} showsVerticalScrollIndicator={true}>
          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Text style = {{fontSize:18, margin:10,fontWeight:'bold'}}>GTPS0054</Text>
            <Text style = {{fontSize:14,}}>Philsvibe</Text>

            
          </View>

          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Text style = {{fontSize:14, margin:10,}}>Total Stocks</Text>
            <Text style = {{fontSize:25,fontWeight:'bold'}}>0 Items</Text>
          </View>

          <View style = {[styles.innerScrollView,{backgroundColor:'#FFFFFF',width:150}]}>
            <Text style = {{fontSize:14, margin:10,}}>Total Views</Text>
            <Text style = {{fontSize:25,fontWeight:'bold'}}>0</Text>
            <Text style = {{fontSize:25,fontWeight:'bold'}}>----------</Text>
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
  },
  headerContainer:{
    marginTop:40,
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
  upperScrollView:{shadowOffset: {width: 10, height: 10},shadowColor: '#d9dbda',shadowOpacity: 0.9,},
  innerScrollView:{flex:1, padding:10, alignItems:'center', margin:10, borderRadius:20, backgroundColor:'#0C9344',width:260,height:150,marginTop:20, marginRight:20,shadowOffset: {width: 10, height: 10},
    shadowColor: '#d9dbda',
    shadowOpacity: 0.9,}
});

