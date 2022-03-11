import React,{useState} from "react";
import {StyleSheet,ActivityIndicator,View,Text} from 'react-native';
const Loader = ({loading,loaderText="loading"}) =>{

    return(
        <>
        {loading ? (
            <View
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: "rgba(0,0,0,0.6)",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
            }}
            >
            <Text style={{ color: "#fff" }}>{loaderText?loaderText:"Processing..."} </Text>
            <ActivityIndicator size={50} color="#fff" />
            </View>
        ) : null}
        </>
           
    )
}
export default Loader;