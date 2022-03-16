import React from "react";
import {View,TextInput,StyleSheet} from "react-native";
import { DrawerContentScrollView,DrawerItem } from "@react-navigation/drawer";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import ButtonComponent from "./ButtonComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../redux/store";
export default function DrawerContent(props){

    

      console.log("loginOutAlready")

    const logout= async()=>{

        await AsyncStorage.removeItem("userLogin");

        await AsyncStorage.removeItem("userData");

        store.dispatch({
            type: "SHOW_SPLASH_SCREEN",
            payload: false,
        });
        global.user =null;
        store.dispatch({
            type: "IS_SIGNED_IN",
            payload: false,
          });


          
        //   props.navigation.navigate("Start");
    }

    const paperTheme = useTheme();
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={80}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{global.user.name?global.user.name:""}</Title>
                                <Caption style={{color:'black'}}>{global.user.memberid?global.user.memberid:"202012340005"}</Caption>
                                {/* <ButtonComponent
                                    textinput="Edit Profile"
                                    buttonWidth={100}
                                    onPress={() => console.log("You Cliked me")}
                                    size ={"sm"}
                                    backgroundColor = {"#0C9344"}
                                    borderRadius = {8}
                                    textColor={"#FFFFFF"}
                                    borderWidth = {1}
                                    borderColors = {"#FFFFFF"}

                                /> */}
                            </View>
                        </View>

                        
                    </View>
                    
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="view-dashboard" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Dashboard"
                            onPress={() => {props.navigation.navigate('HomeStack')}}
                        />
                    </Drawer.Section>


                    {/* <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => {props.navigation.navigate('AccountStackWithBottom')}}
                        />
                    </Drawer.Section> */}


                    <Drawer.Section style={styles.drawerSection}>
                        <Text style = {{fontSize:12,fontWeight:'bold', marginLeft:10}}>Manage Payment</Text>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payment" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Add Payment"
                            onPress={() => {props.navigation.navigate('HomeStack', 
                            { 
                            screen: 'HomeTab',params: {
                                screen: 'MemberPayment',}, 
                            })
                            }}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="All Payment Report"
                            onPress={() => {props.navigation.navigate('PaymentReport')
                            }}
                        />
                    </Drawer.Section>


                    <Drawer.Section style={styles.drawerSection}>
                        <Text style = {{fontSize:12,fontWeight:'bold', marginLeft:10}}>Manage Member</Text>
                        

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Add/Edit Member"
                            onPress={() => {props.navigation.navigate('HomeStack', 
                            { 
                            screen: 'HomeTab',params: {
                                screen: 'AddNewMember',}, 
                            })
                            }}
                        />



                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Geneology List"
                            onPress={() => {props.navigation.navigate('GenerologyList')
                            }}
                        />

                    </Drawer.Section>


                    

                    <Drawer.Section style={styles.drawerSection}>
                        
                        <Text style = {{fontSize:12,fontWeight:'bold', marginLeft:10}}>Wallet</Text>

                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payments" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Commission"
                            onPress={() => {props.navigation.navigate('CommissionReport')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payments" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Withdrawal"
                            onPress={() => {props.navigation.navigate('Withdrawal')}}
                        />


                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payments" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Withdrawal Request"
                            onPress={() => {props.navigation.navigate('SubmitWithdrawRequest')}}
                        />

                        
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <Text style = {{fontSize:12,fontWeight:'bold', marginLeft:10}}>My E-Shop</Text>
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Feather 
                                name="shopping-bag" 
                                color={color}
                                size={size}
                                />
                            )}
                            labelStyle={{fontWeight:'bold'}}
                            label="shop"
                            onPress={() => {props.navigation.navigate('HomeStack', 
                            { 
                            screen: 'ShopTab',
                            params: {
                                screen: 'Shop',
                            }, 
                            })
                            }}
                        />
                        
                    </Drawer.Section>



                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="exit-to-app" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Sign Out"
                            labelStyle={{fontWeight:'bold'}}
                            onPress={() => {logout()}}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });