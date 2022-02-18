import React from "react";
import { View, Button, Text, StyleSheet,ScrollView } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';



const AddStock = ({ navigation,props }) => {

    const Back = () =>{
        navigation.goBack()
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];

  return (
    <View style={styles.container}>
        {/* header Starts */}
            {/* <HeaderComponent onPress = {Back} memberId = {"10000203445"}/> */}
        {/* Header Container Ends */}



      {/* Body Starts */}

        <View style = {styles.BodyContainer}>

            

        <View >

            <View>
                <BackBtn 
                    onPress = {Back}
                />
            </View>

            

        </View>



            {/* <View style ={styles.BodyHeader}>

                <Text style = {{fontWeight:'bold'}}>Submit Withdrawal Request</Text>
            </View> */}

            {/* <View style ={{marginTop:20}}>

                <Text style = {{fontWeight:'bold'}}>Submit Withdrawal Request</Text>
            </View> */}

            <ScrollView style ={styles.ContentBody}>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    // inputValue={"Member ID"}
                    borderWidth={1}
                    inputLabel = {"Shop ID:"}
                    placeholder={"GTPS0054"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={"val"}
                        onValueChange={(phoneVerificationType) =>
                            console.log("logged")
                        }
                        placeholder={"Select Category"}
                        items={Items}
                        inputLabel = {"Select Category:"}
                    />
                </View>


                

                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    // inputValue={"Member ID"}
                    borderWidth={1}
                    // inputLabel = {"Member ID"}
                    placeholder={"Enter Product Name"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    borderWidth={1}
                    // inputLabel = {"Enter Amount"}
                    multiline = {true}
                    placeholder={"Enter Product Description"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    // inputValue={"Member ID"}
                    borderWidth={1}
                    inputLabel = {"Unit Cost [=N=]:"}
                    placeholder={"Enter Amount"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    // inputValue={"Member ID"}
                    borderWidth={1}
                    inputLabel = {"Stock Quantity"}
                    placeholder={"Enter Quantity"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>



                <View style = {{paddingTop:30}}>
                    <InputBox
                    keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    // inputValue={"Member ID"}
                    borderWidth={1}
                    inputLabel = {"% Discount"}
                    placeholder={"0"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={"val"}
                        onValueChange={(phoneVerificationType) =>
                            console.log("logged")
                        }
                        placeholder={"Select Category"}
                        items={Items}
                        inputLabel = {"Negotiable:"}
                    />
                </View>

                
            </ScrollView>

            <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                
                <View style={{justifyContent:'center',marginTop:20}}>
                    <ButtonComponent
                        textinput="Add To Stock"
                        buttonWidth={250}
                        onPress={() => this.submitForm()}
                        // size ={"sm"}
                        boldText = {"bold"}
                        backgroundColor = {"#0C9344"}
                        borderRadius = {16}
                        textColor={"#FFFFFF"}
                        borderWidth = {1}
                        borderColors = {"#FFFFFF"}

                    />
                    
                </View>

                <View style={{justifyContent:'center',marginTop:20}}>
                    <ButtonComponent
                        textinput="Reset"
                        buttonWidth={250}
                        onPress={() => this.submitForm()}
                        // size ={"sm"}
                        boldText = {"bold"}
                        backgroundColor = {"#1976D2"}
                        borderRadius = {16}
                        textColor={"#FFFFFF"}
                        borderWidth = {1}
                        borderColors = {"#FFFFFF"}

                    />
                    
                </View>
            </View>
        </View>
      {/* CardBody Ends */}

        <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            
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
    flex: 0.95,
    padding:20,
    paddingTop:50,
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
  }
});

export default AddStock;