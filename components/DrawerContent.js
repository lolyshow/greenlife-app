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
export default function DrawerContent(props){

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
                                <Title style={styles.title}>Josiah Orie</Title>
                                <Caption style={{color:'black'}}>200000000000000</Caption>
                                <ButtonComponent
                                    textinput="Edit Profile"
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
                            // onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => {props.navigation.navigate('Prof')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payment" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Manage Payment"
                            onPress={() => {props.navigation.navigate('MemberPayment')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-group" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Manage Member"
                            // onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons 
                                name="payments" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Commission"
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />

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
                            // onPress={() => {props.navigation.navigate('SupportScreen')}}
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
                            onPress={() => {signOut()}}
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