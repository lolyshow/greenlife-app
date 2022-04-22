import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet,ScrollView,Image,ActivityIndicator,TouchableOpacity,Dimensions,Alert } from "react-native";
import {useTheme,Avatar,Title,Caption,Paragraph,Drawer,TouchableRipple,Switch} from 'react-native-paper';
import ButtonComponent from "../../components/ButtonComponent";
import InputBox from "../../components/InputBox";
import BackBtn from "../../components/BackBtn";
import SelectBox from "../../components/SelectBox";
import SearchBar from "../../components/SearchBar";
import HeaderComponent from "../../components/HeaderComponent";
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import ShopImage from "../../assets/shop.png";
import { getCountriesApiServices } from "../../services/getCountries";
import Helper from "../../Helpers/Helper";
import { useSelector } from "react-redux";
import ModalPopUp from "../../components/ModalPopUp";
const screenWidth = Math.round(Dimensions.get("window").width);
const Stocks = ({ navigation,props }) => {

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [ShopDetailsResponse, setShopDetailsResponse] = useState({});
    const [ismodalVisible, setModalVisible] = useState(false);
    const {memberids,setMemberid} = useSelector((state) => state.appReducer.userDetails.response);
    const [DetailsResponse, setDetailsResponse] = useState({});
    const [shopID, setShopID] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQunatity] = useState("");
    const [discount, setDiscount] = useState("");
    const [isNegotiable, setIsNegotiable] = useState("");
    const [showHerbalCategory, setShowHerbalCategory] = useState(false);
    const [herbalCategory, setHerbalCategory] = useState("");
    const [showProductBrand, setShowProductBrand] = useState(false);
    const [productBrand, setProductBrand] = useState("false");
    const [greenlifeProduct, setGreenlifeProduct] = useState("");
    const [amount, setAmount] = useState(0);
    const [selectedData, setSelectedData] = useState({});
    
    
    const {name,memberid} = useSelector((state) => state.appReducer.userDetails.response);
    useEffect(() => {
      fetchShopDetails()
    },[]);

    const Back = () =>{
        navigation.goBack()
    }

    const setSearchPhraseFunc = (text) =>{
        setSearchPhrase(text)
    }

    const toggleNav = () =>{navigation.openDrawer()}

    const setClickedFunc = (action) =>{
        setClicked(action)
    }


    const fetchShopDetails =async()=>{
      try {
        setProcessing(true);
        
        let payload = "backoffice/shop_details.jsp?memberid="+memberid+"&api";
        await Helper.getRequest(payload)
        .then((result) =>{ 
          let { message, error, response } = result;
          // console.log(response)
          setProcessing(false);
          if (!error) {
            setShopDetailsResponse(result.response);
            
          } else {
            Alert.alert("Shop", message);
          }
  
        });
  
        
      } catch (error) {
        setProcessing(false);
        Alert.alert("Error", error.toString());
      }
    }

    const toggleEdit=(data)=>{
      setSelectedData(data)

      setModalVisible(true)
    }
    
    const onPressCloseModal =()=>{
      setModalVisible(false)
    }


    const AddStock =() =>{
      navigation.navigate({
      name:'AddStock',
      params: { ShopID: ShopDetailsResponse.shopid },
      });
    }


    



    //Edit Store Starts





              const resetForm = () =>{
                setCategory("");
                setProductName("");
                setDescription("");
                setQunatity("");
                setShowProductBrand(false)
                setShowHerbalCategory(false)
                setProductBrand("")
                setHerbalCategory("")
                setDiscount("");
                setIsNegotiable("");
                setAmount("");
            }

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

              const setStockCategory= (value)=>{
                  if(value == "Herbal"){
                      setShowHerbalCategory(true)
                  }else{
                      setShowHerbalCategory(false)
                  }
                  setCategory(value)
                  
              }

              const setHerbalCategoryFunc =(value)=>{
                  setHerbalCategory(value)
                  if(value == "Greenlife Product"){
                      setShowProductBrand(true)
                  }else{
                      setShowProductBrand(false)
                  }
                  setProductBrand(value);
              }

              const submitForm = async()=>{
                  if(selectedData.cost>0){
                      
                    let payload = {
                        comboCategory:2, //selectedData.category_name,
                        textProductName: selectedData.productname,
                        textDescription: selectedData.desc,
                        textUnitCost: selectedData.cost,
                        textDiscount: Math.floor(selectedData.disc_cost),
                        textQuantity:selectedData.qty,
                        comboNegotiation: selectedData?.nego,
                        function: "edit_",
                        textStockID: selectedData.stockid,
                        textProductID: null,
                        textMemID: ShopDetailsResponse?.memberid,                            
                    }
                    
                    console.log("myRequestPayloadHere",payload)

                    try {

                        setProcessing(true);
                        
                        let linkUrl = "greenlifetreasurepurse/MemberStockControllerServlet?action=edit_Stock&api";
                        await Helper.getRequest(linkUrl,"post",payload)
                        .then((result) =>{ 
                        let { message, error, response } = result;
                        console.log("myResult Is",result)
                        setProcessing(false);
                        if (!error) {
                            setDetailsResponse(result.response);
                            resetForm();
                            fetchShopDetails()
                            Alert.alert("Stock Update", result.response.msg);
                            setModalVisible(false)
                        } else {
                            
                            Alert.alert("Stock Update", message);
                        }
                
                        });
                        
                    } catch (error) {
                        setProcessing(false);
                        Alert.alert("Error", error.toString());
                    }
                      
                  }else{
                      Alert.alert("Payment", "Please Enter A Valid Amount");
                  }
              }


              const setSelectedHarbalCategory =(value)=>{
                  setGreenlifeProduct(value)
              }
              
              const setDescriptionFunc =(desc)=>{
                let updatedPayload = {
                  ...selectedData,
                  desc,
                };
                setSelectedData(updatedPayload);
              }

              const renderStore = ()=>{

                return (
                  <View>
                    


                    <View style = {{}}>
                        <SelectBox
                            value={selectedData?.category_name}
                            onValueChange={(value) => setStockCategory(value)}
                            placeholder={{ label: "Select Category:", value: null }}
                            items={Categories}
                            
                        />
                    </View>


                    <View style = {{marginTop:30}}>
                        <InputBox
                        onChangeText={(gl_productname) => setSelectedData({...selectedData,gl_productname,})}
                        inputValue={selectedData?.gl_productname}
                        borderWidth={1}
                        placeholder={"Enter Product Name"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>


                    <View style = {{marginTop:30}}>
                        <InputBox
                        onChangeText={(value) => setDescriptionFunc(value)}
                        inputValue={selectedData?.desc}
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
                        onChangeText={(cost) =>{cost>=0?setSelectedData({...selectedData,cost,}):Alert.alert("Payment", "Please Enter a Valid Amount")}}
                        inputValue={selectedData?.cost}
                        borderWidth={1}
                        inputLabel = {"Unit Cost [=N=]:"}
                        placeholder={"Enter Amount"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>


                    <View style = {{marginTop:30}}>
                        <InputBox
                        keyboardType="numeric"
                        onChangeText={(qty) => setSelectedData({...selectedData,qty})}
                        inputValue={selectedData?.qty}
                        borderWidth={1}
                        placeholder={"Enter Quantity"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>



                    <View style = {{marginTop:30}}>
                        <InputBox
                        keyboardType="numeric"
                        onChangeText={(disc_cost) => setSelectedData({...selectedData,disc_cost})}
                        inputValue={selectedData?.disc_cost}
                        borderWidth={1}
                        placeholder={"% Discount"}
                        textColor="black"
                        background="#FFFFFF"
                        />
                    </View>


                    <View style = {{marginTop:30}}>
                        <SelectBox
                            value={selectedData?.nego}
                            onValueChange={(nego)=>setSelectedData({...selectedData,nego})}
                            placeholder={{ label: "Select Negotiable", value: null }}
                            items={Negotiable}
                        />
                    </View>

                    <View style = {{marginTop:20,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    
                        <View style={{justifyContent:'center',marginTop:20}}>
                            <ButtonComponent
                                textinput="Update Stock"
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

                        
                    </View>
                  </View>
                );
              }

  //edit store ends
  console.log("mySeletedData",selectedData)
  const {fullname,msg,shop_lga,shop_street,shopid,shopname,stocks} = ShopDetailsResponse;
  let count = 0;
  let half = (screenWidth/2)-30;
  return (
     
    <View style={styles.container}>
        {/* header Starts */}
    
      <HeaderComponent onPress = {toggleNav} n = {"10000203445"} headerType = {"home"}/>
      {/* Header Container Ends */}



      {/* Body Starts */}

        <ScrollView style = {styles.BodyContainer} showsVerticalScrollIndicator={false}>

            <View>
                
                {processing?
                <View>
                    <ActivityIndicator size="large" color="#0C9344" />
                </View>: stocks && stocks.length>0?
                stocks.map((data)=>{
                
                return(<View style = {[styles.Card2,]} key = {count+=1}>
                    <View style = {{flexDirection:'row',}} key = {count+=1}>
                      <View style = {{marginRight:10,justifyContent:'center',}}>
                          <TouchableOpacity
                              onPress={()=>null}
                              // disabled={processing}
                              style={{}}
                          >
                              <Image
                                  source = {ShopImage}
                                  size = {200}
                              />
                          </TouchableOpacity>
                      </View>

                      <View style = {{}}>
                          <View style = {{marginBottom:20}}>
                              <Text style = {{marginBottom:4,}}>Product Name</Text>
                              <Text style = {styles.BoldText}>{data.productname}</Text>
                          </View>
                          <View style = {{marginBottom:20}}>
                              <Text style = {{marginBottom:4,}}>Price</Text>
                              <Text style = {styles.BoldText}>{data.cost}</Text>
                          </View>

                          <View style = {{marginBottom:20,}}>
                              <Text style = {{marginBottom:8,}}>Quantity</Text>
                              <Text style = {styles.BoldText}>{data.qty}</Text>
                          </View>
                      </View>
                    </View>
                    <TouchableOpacity onPress={()=>toggleEdit(data)}>
                      <View style = {{alignItems:'flex-end',}} key = {count+=1}><Text style = {{size:14, color:"#2962ff"}}>Edit</Text></View>
                    </TouchableOpacity>
                  </View>

                )})
                :<View><Text>No Stock Available</Text></View>
            }
            </View>   

                                  

            
            
        </ScrollView>
      {/* CardBody Ends */}
      <ModalPopUp 
        modalVisible = {ismodalVisible}
        onPressCloseModal = {()=>setModalVisible(false)}
        children={renderStore()}
      />
        
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:'white',
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor:'white',
  },
  headerContainer:{
    marginTop:40,
    marginBottom:20,
    // justifyContent:'',
    flexDirection:'row',
  },
  BodyContainer:{
    flex:1,
    backgroundColor:"white",

  },
  BoldText:{
    fontWeight:'bold',
    fontSize:12,

  },
    Card:{
    borderRadius:5,
    padding:20,
    height:200,
    marginTop:10,
    backgroundColor:"#97ADB6",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  Card2:{
    borderRadius:10,
    padding:10,
    height:220,
    marginTop:20,
    backgroundColor:"white",
    shadowColor: '#171717',
    borderColor:'#979797',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth:1,
    elevation:2,
    // alignContent:'center',
    // alignItems:'center'
  },
});

export default Stocks;