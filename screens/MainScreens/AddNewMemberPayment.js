import React from "react";
import { View, Button, Text, StyleSheet,ScrollView } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';



const AddNewMemberPayment = ({ navigation,props }) => {

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
        <HeaderComponent onPress = {Back} memberId = {"10000203445"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <View style = {styles.BodyContainer}>
            <View style ={styles.BodyHeader}>

                <Text>Add New Member Payment</Text>
            </View>

            <ScrollView style ={styles.ContentBody}>

                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={"val"}
                        onValueChange={(phoneVerificationType) =>
                            console.log("logged")
                        }
                        placeholder={{}}
                        items={Items}
                        inputLabel = {"Select Purpose:"}
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <SelectBox
                        value={"val"}
                        onValueChange={(phoneVerificationType) =>
                            console.log("logged")
                        }
                        placeholder={{}}
                        items={Items}
                        inputLabel = {"Select Payment Type:"}
                    />
                </View>

                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Member ID"}
                    borderWidth={1}
                    inputLabel = {"Member ID"}
                    placeholder={"Member ID"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Enter Amount Paid"}
                    borderWidth={1}
                    inputLabel = {"Enter Amount"}
                    placeholder={"Enter Amount Paid"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>



                <View style = {{paddingTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(pinNo) => console.log('')}
                    inputValue={"Teller:"}
                    borderWidth={1}
                    inputLabel = {"Enter Teller No"}
                    placeholder={"Enter Teller No"}
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
                        placeholder={{}}
                        items={Items}
                        inputLabel = {"Select Bank:"}
                    />
                </View>
            </ScrollView>
            
        </View>
      {/* CardBody Ends */}

        <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            <View style={{justifyContent:'center',marginTop:20}}>
                <ButtonComponent
                    textinput="Add Member Payment"
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
    flex: 0.9,
    padding:20,
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

export default AddNewMemberPayment;