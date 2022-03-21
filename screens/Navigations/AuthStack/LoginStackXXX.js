import * as React from 'react';
import { View, StyleSheet, Dimensions,Text } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
 
const FirstRoute = (navigation) => (
  <View style={[styles.scene, { backgroundColor: '#FFF' }]} >

    <Text>My Text</Text>
  </View>
);
 
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
 
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#ff9900' }}
    style={{ backgroundColor: '#FFF', color:"red", }}
    activeColor={"red"}
    pressColor={"red"}
    contentContainerStyle={{color:'red'}}
    renderLabel={({ route, focused, color }) => (
    <Text style={{ color:"black", margin: 8 }}>
      {route.title}
    </Text>
  )}
  />
);

const initialLayout = { width: Dimensions.get('window').width };
 
export default function LoginStack() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'SignIn', title: 'SignIn' },
    { key: 'SignUp', title: 'SignUp' },
  ]);
 
  const renderScene = SceneMap({
    SignIn: FirstRoute,
    SignUp: SecondRoute,
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ backgroundColor: 'pink',color:'red' }}
      indicatorStyle={{ backgroundColor: 'red' }}
      initialLayout={initialLayout}
      getLabelText={ "route.title"}
      activeColor={"red"}
      tabStyle={{color:'red'}}
      pressColor={"red"}
      renderTabBar={renderTabBar}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});