import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet,ScrollView, Alert } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import Space from "../../components/Space/Space";
import HeaderComponent from "../../components/HeaderComponent";

import Helper from "../../Helpers/Helper";
import Loader  from '../../components/Loader';


const GenerologyList = ({ navigation,props }) => {

    const Back = () =>{
        navigation.goBack()
    }

    useEffect(() => {
        geneologyList();
      },[]);

   
    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});



    
    const Banks = [
        { label: 'GTB', value: 'Gtb' },
        { label: 'ZENITH', value: 'Zenith' },
        { label: 'UBA', value: 'UBA' },
    ];

    
    const geneologyList = async()=>{
     
        try {

            setProcessing(true);
            
            let linkUrl = "TeamPerformanceAgentServlet?memberid="+global.user.memberid+"&api";
            
            await Helper.Request(linkUrl)
            .then((result) =>{
            let { message, error, response } = result;
            setProcessing(false);
            if (!error) {
                setDetailsResponse(result.response);
            } else {
                Alert.alert("Payment", message);
            }
    
            });
            
        } catch (error) {
            setProcessing(false);
            Alert.alert("Error", error.toString());
        }
            
        
    }
    

    const viewMore=(data)=>{
        navigation.navigate({
            name:'ViewMore',
            params: { routeData:data},
        });
    }


    const TableContent =(memberID,Name,Status,count,data)=>{
        
        return (
            
            <View style={{flexDirection:'row',}} key = {count}>
                            
                <View style = {{width:100}}><Text>{memberID}</Text></View>
                <View style = {{width:100,marginLeft:20}}><Text style = {{textAlign:'center'}}>{Name}</Text></View>
                <View style = {{width:100,marginLeft:40}}><Text style = {{textAlign:'center'}}>{Status}</Text></View>
                
                <View style = {{width:100,marginLeft:20,justifyContent:"center"}}>

                    <ButtonComponent
                        textinput="View"
                        buttonWidth={50}
                        onPress={() => viewMore(data)}
                        boldText = {"bold"}
                        processing = {processing}
                        backgroundColor = {null}
                        borderRadius = {10}
                        btnHeight = {30}
                        textColor={"#0C9344"}
                        borderWidth = {1}
                        borderColors = {"#0C9344"}

                    />
                </View>
            </View>
            
        );
    }

    const {members} = DetailsResponse;
    let count = 0;
  return (
    <View style={styles.container}>
      {/* header Starts */}
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}
        <View>
            <View>
                <Text style = {{fontSize:24,fontWeight:'bold'}}>Geneology Summary </Text>
            </View>

            <View style = {{marginTop:20,marginBottom:20}}>
                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',fontWeight:'bold'}}>Total Downlines:</Text></View>
                    <View style = {{width:120,height:30,justifyContent:'center'}}><Text style = {{color:'#0C9344',textAlign:'center'}}>51 Downlines</Text></View>
                </View>

                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',}}>Total A-Side</Text></View>
                    <View style = {{width:120,backgroundColor:'green',height:30,justifyContent:'center'}}><Text style = {{textAlign:'center',color:'#FFFFFF'}}>5 Downlines</Text></View>
                </View>

                <View style = {{flexDirection:'row'}}>
                    <View style = {{width:150,}}><Text style = {{color:'#0C9344',}}>Total B-Side</Text></View>
                    <View style = {{width:120,}}><Text style = {{color:'#0C9344',textAlign:'center'}}>47 Downlines</Text></View>
                </View>
            
            </View> 

            <View>
                <View style = {{borderColor:'green',borderWidth:1,margin:20,borderRadius:20,padding:10}}>
                    <Text style={{fontSize:10,textAlign:'center',fontWeight:'bold'}}>GREENLIFE TREASURE PURSE REFERRAL NETWORK</Text>
                    <Text style={{fontSize:12,textAlign:'center',fontWeight:'bold'}}> RIE JOSIAH - 202012340008</Text>
                </View>
            </View>
            <Loader loading = {processing}/>

            <ScrollView horizontal ={true} >
                <View horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View  style = {{}}>
                        <View  style={{flexDirection:'row',backgroundColor:'#0C9344'}}>
                            <Text style ={styles.HeadingText}>MemberID</Text>
                            <Text style = {styles.HeadingText}>Destributor Name</Text>
                            <Text style = {styles.HeadingText}>Status</Text>
                            <Text style = {styles.HeadingText}>Action</Text>
                        </View>
                        <Space top = {10}/>
                        <ScrollView >
                            {members && members.length>0? members.map((data)=>TableContent(data.sponsor,data.name,data.status,count+=1,data)) :<View></View>}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingLeft:20,
    paddingRight:20,
  },
  headerContainer:{
    marginTop:40,
    marginBottom:20,
    // justifyContent:'',
    flexDirection:'row',
  },
  BodyContainer:{
    flex:1,
    borderRadius:20,
    padding:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  HeadingText:{
      margin:10,
      marginRight:35,
    
      fontSize:15, 
      fontWeight:'bold',
      color:"#FFFFFF"
  },
  BodyText:{
    // marginLeft:10,
    marginRight:10
}
});

export default GenerologyList;
