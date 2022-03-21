import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Alert } from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import Helper from "../../Helpers/Helper";

    

const AddStock = ({ navigation,route }) => {

    const [processing, setProcessing] = useState(false);
    const [DetailsResponse, setDetailsResponse] = useState({});
    const [shopID, setShopID] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQunatity] = useState("");
    const [discount, setDiscount] = useState("");
    const [isNegotiable, setIsNegotiable] = useState("");
    const [amount, setAmount] = useState(0);

    const resetForm = () =>{
        setCategory("");
        setProductName("");
        setDescription("");
        setQunatity("");

        setDiscount("");
        setIsNegotiable("");
        setAmount("");
    }

    

    const Back = () =>{
        navigation.goBack()
    }

    const Items = [
        { label: 'Activation', value: 'activation' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ];

    const Categories = [
        { label: 'Herbal', value: 'Herbal' },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Smart Phones', value: 'Smart Phones' },
        { label: 'HouseHold Products', value: 'HouseHold Products' },
        { label: 'Services', value: 'Services' },
        { label: 'Turkey Shirt, Turkey Gowns, Turkey Tops, Suits, Etc', value: 'Others' },
        { label: 'Women Bag', value: 'Women Bag' },
        { label: 'Ladies Turkey Wears', value: 'Ladies Turkey Wears' },
        { label: 'Smart Phones', value: 'Smart Phones' },
    ];

    const Negotiable = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
    ]


    const submitForm = async()=>{
        if(amount>0){
            if(amount!=0 && category!="" && productName!="" && quantity!="" && Negotiable!=""){
                let payload = {
                    textShopID: route.params.ShopID,
                    comboCategory: category,
                    textCategory:2,
                    comboChoice: "choose",
                    comboGLProducts: "",
                    textProductName: productName,
                    textDescription: global.user.memberid,
                    textUnitCost: amount,
                    textDiscount: 0,
                    textQuantity: quantity,
                    comboNegotiation: isNegotiable,
                    textFunction: "new",
                    textID: "",
                    textMemberID: global.user.memberid,
                    textPage: "shop_details"
                   
                }
                // return;
                try {
  
                    setProcessing(true);
                    
                    let linkUrl = "AdminTaskControllerServlet?action=AddNewStock&api";
                    await Helper.getRequest(linkUrl,"post",payload)
                    .then((result) =>{ 
                    let { message, error, response } = result;
                    setProcessing(false);
                    if (!error) {
                        setDetailsResponse(result.response);
                        resetForm();
                        Alert.alert("Withdrawal", result.response.msg);
                    } else {
                        Alert.alert("Withdrawal", message);
                    }
            
                    });
                    
                } catch (error) {
                    setProcessing(false);
                    Alert.alert("Error", error.toString());
                }
            }else{
                Alert.alert("Payment", "Empty Fields are required");
            }
        }else{
            Alert.alert("Payment", "Please Enter A Valid Amount");
        }
    }
    const {msg} = DetailsResponse;
    
    
  return (
    <View style={styles.container}>
        
      {/* Body Starts */}

        <View style = {styles.BodyContainer}>
            <View >

                <View>
                    <BackBtn 
                        onPress = {Back}
                    />
                </View>

            </View>


            <ScrollView style ={[styles.ContentBody,{marginBottom:30}]} showsVerticalScrollIndicator={false}>


                <View style = {{marginTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => null}
                    inputValue={route.params.ShopID}
                    borderWidth={1}
                    inputLabel = {"Shop ID:"}
                    placeholder={"GTPS0054"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{marginTop:30}}>
                    <SelectBox
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                        placeholder={{ label: "Select Category:", value: null }}
                        items={Categories}
                        
                    />
                </View>


                

                <View style = {{marginTop:30}}>
                    <InputBox
                    onChangeText={(value) => setProductName(value)}
                    inputValue={productName}
                    borderWidth={1}
                    placeholder={"Enter Product Name"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{marginTop:30}}>
                    <InputBox
                    onChangeText={(value) => setDescription(value)}
                    inputValue={description}
                    borderWidth={1}
                    multiline = {true}
                    placeholder={"Enter Product Description"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{marginTop:30}}>
                    <InputBox
                    keyboardType="numeric"
                    onChangeText={(value) =>{value>=0?setAmount(value):Alert.alert("Payment", "Please Enter a Valid Amount")}}
                    inputValue={amount}
                    borderWidth={1}
                    inputLabel = {"Unit Cost [=N=]:"}
                    placeholder={"Enter Amount"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{marginTop:30}}>
                    <InputBox
                    // keyboardType="numeric"
                    onChangeText={(value) => setQunatity(value)}
                    inputValue={quantity}
                    borderWidth={1}
                    placeholder={"Enter Quantity"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>



                <View style = {{marginTop:30}}>
                    <InputBox
                    keyboardType="numeric"
                    onChangeText={(value) => setDiscount(value)}
                    inputValue={discount}
                    borderWidth={1}
                    placeholder={"% Discount"}
                    textColor="black"
                    background="#FFFFFF"
                    />
                </View>


                <View style = {{marginTop:30}}>
                    <SelectBox
                        value={isNegotiable}
                        onValueChange={(value)=>setIsNegotiable(value)}
                        placeholder={{ label: "Select Negotiable", value: null }}
                        items={Negotiable}
                    />
                </View>

                <View style = {{marginTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                
                    <View style={{justifyContent:'center',marginTop:20}}>
                        <ButtonComponent
                            textinput="Add To Stock"
                            buttonWidth={250}
                            onPress={() => submitForm()}
                            processing={processing}
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
                            onPress={() => submitForm}
                            processing={processing}
                            boldText = {"bold"}
                            backgroundColor = {"#1976D2"}
                            borderRadius = {16}
                            textColor={"#FFFFFF"}
                            borderWidth = {1}
                            borderColors = {"#FFFFFF"}

                        />
                        
                    </View>
                </View>
                
            </ScrollView>

            
        </View>
      {/* CardBody Ends */}

        {/* <View style = {{paddingTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
            
        </View> */}
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
    marginTop:20,
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
  }
});

export default AddStock;