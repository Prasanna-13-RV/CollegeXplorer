import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/food/HomeScreen';
import ResturantScreen from './screens/food/ResturantScreen';
import CartScreen from './screens/food/CartScreen';
import PreparingOrderScreen from './screens/food/PreparingOrderScreen';
import PreparingProductScreen from './screens/stationery/PreparingProductScreen';
import StationeryCartScreen from './screens/stationery/StationeryCartScreen';
import StationeryHomeScreen from './screens/stationery/StationeryHomeScreen';
import StationeryShopScreen from './screens/stationery/StationeryShopScreen';
import BottomTabNavigator, {MyTabBar} from './screens/navigation/MyTabBar';
import Maps from './screens/attendance/Maps';
import Selfie from './screens/attendance/Selfie';
import LoginScreenStudent from './screens/auth/LoginScreenStudent';
import {SignupScreenStudent} from './screens/auth/SignupScreenStudent';

import {OrderScreen} from './screens/food/OrderScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StudentProfile from './screens/auth/StudentProfile';
import NotesScreen from './screens/notes/NotesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="BottomTabNavigator"
          component={drawerNav}
          options={{headerShown: false}}
        />

        {/* auth */}
        <Stack.Screen name="Login" component={LoginScreenStudent} />
        <Stack.Screen name="Signup" component={SignupScreenStudent} />

        {/* food */}
        <Stack.Screen name="Buy" component={HomeScreen} />
        <Stack.Screen name="Resturant" component={ResturantScreen} />
        <Stack.Screen
          name="Cart"
          options={{presentation: 'modal', headerShown: false}}
          component={CartScreen}
        />
        <Stack.Screen
          name="PreparingOrder"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={PreparingOrderScreen}
        />
        <Stack.Screen name="Orders" component={OrderScreen} />

      
        {/* stationery */}
        <Stack.Screen
          name="PreparingProductScreen"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={PreparingProductScreen}
        />
        <Stack.Screen
          name="StationeryCartScreen"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={StationeryCartScreen}
        />
       
        <Stack.Screen
          name="StationeryHomeScreen"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={StationeryHomeScreen}
        />
        <Stack.Screen
          name="StationeryShopScreen"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={StationeryShopScreen}
        />

        {/* attendance */}
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Selfie" component={Selfie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const drawerNav = () => {
  return (

    <Drawer.Navigator
           drawerType="front"
           initialRouteName="Attendance"
           drawerContentOptions={{
             activeTintColor: '#e91e63',
             itemStyle: { marginVertical: 10 },
           }}
      
    
    >
       <Drawer.Screen
            key={"Attendance"}
            name={"Attendance"} 
            component={Selfie}  
            />
           <Drawer.Screen
            key={"Notes"}
            name={"Notes"} 
            component={NotesScreen}  
            />
            <Drawer.Screen
            key={"Orders"}
            name={"Orders"} 
            component={OrderScreen}  
            />
            <Drawer.Screen
            key={"Buy"}
            name={"Buy"} 
            component={BottomTabNavigator}  
            />
             <Drawer.Screen
            key={"Profile"}
            name={"Profile"} 
            component={StudentProfile}  
            />
            
           
    </Drawer.Navigator>
 
     );
};
