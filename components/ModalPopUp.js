import React, { useState } from "react";
import { Alert, Modal,Dimensions, StyleSheet, Text, Pressable, View,ScrollView, TouchableOpacity } from "react-native";
import BackBtn from "./BackBtn";
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const ModalPopUp = ({modalVisible=false,onPressCloseModal,children}) => {
//   const [modalVisible, setModalVisible] = useState(visible);
  
return (
    <>
    {/* {modalVisible ? ( */}
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onPressCloseModal}
        
      >
        <View style={styles.centeredView}>
            
            <View style = {{}}>
                

                <View style={styles.modalView}>
                <View>
    


                    <TouchableOpacity onPress ={onPressCloseModal} style={{marginLeft:220,width:20,marginTop:-10,backgroundColor:"black",borderRadius:2}}>
                        <Text style={{color:"#FFFFFF",textAlign:'center'}}>X</Text>
                        
                    </TouchableOpacity>

                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
                    
                </View>
            </View>
        </View>
      </Modal>
     
    {/* ): null} */}
    </>
  );
};

const styles = StyleSheet.create({
    centeredView: {
    //   flex: 1,
    width:screenWidth,
    height:screenHeight-80,
    justifyContent:'center',
      marginTop: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default ModalPopUp;