import React from "react";
import {View,Text,TouchableOpacity,Image} from  "react-native";
import ButtonComponent from "./ButtonComponent";

const StoreCard = ({filepath,shopname,address,phone,count,onPressCall,onPressProduct})=>{
    
    return (
        <View style={{shadowOffset: {width: 10, height: 10}, flexDirection:'row', justifyContent:'space-between', shadowColor: '#d9dbda', elevation:2,borderLeftColor:'black',shadowOpacity: 0.9,padding:10}} key={count}>
            <TouchableOpacity onPress={()=>console.log("pressed!!!")} style = {{justifyContent:'center',margin:10,}}>
                <View style ={{alignSelf:'center'}}>
                    <Image style={{resizeMode: "cover",height: 80,width: 80 }}   source={{uri:filepath}}  />
                </View>
            </TouchableOpacity>
            <View style = {[{width:180,borderLeftWidth:1,}]}>
            <View style = {{marginLeft:5}}>
                
                <Text style={{fontSize:15,fontWeight:'bold',}}>Shop Name: </Text>
                <Text>{shopname}</Text>
                <Text style={{fontSize:15,fontWeight:'bold',}}>Phone: </Text>
                <Text>{phone}</Text>
                <Text style={{fontSize:15,fontWeight:'bold',}}>Address: </Text>

                <Text>{address}</Text>

                <View style={{paddingTop:3, flexDirection:'row'}}>
                <ButtonComponent
                    textinput="CAll NOW"
                    buttonWidth={90}
                    onPress={onPressCall}
                    size ={"sm"}
                    backgroundColor = {"#337ab7"}
                    borderRadius = {8}
                    textColor={"#FFFFFF"}
                    borderWidth = {1}
                    borderColors = {"#FFFFFF"}
                    btnHeight = {20}
                    icon = {"phone-call"}
                    fontSize = {10}
                />


                <ButtonComponent
                    textinput="Products"
                    buttonWidth={90}
                    onPress={onPressProduct}
                    size ={"sm"}
                    backgroundColor = {"#337ab7"}
                    borderRadius = {8}
                    textColor={"#FFFFFF"}
                    borderWidth = {1}
                    borderColors = {"#FFFFFF"}
                    btnHeight = {20}
                    icon = {"shopping-cart"}
                    fontSize = {10}
                />
                </View>
            </View>
            </View>

        </View>
    )
}

export default StoreCard;