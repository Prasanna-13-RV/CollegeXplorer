import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/food/HomeScreen';
import ResturantScreen from './screens/food/ResturantScreen';
import CartScreen from './screens/food/CartScreen';
import PreparingOrderScreen from './screens/food/PreparingOrderScreen';
import DeliveryScreen from './screens/food/DeliveryScreen';
import PreparingProductScreen from './screens/stationery/PreparingProductScreen';
import StationeryCartScreen from './screens/stationery/StationeryCartScreen';
import StationeryDeliveryScreen from './screens/stationery/StationeryDeliveryScreen';
import StationeryHomeScreen from './screens/stationery/StationeryHomeScreen';
import StationeryShopScreen from './screens/stationery/StationeryShopScreen';
import BottomTabNavigator, {MyTabBar} from './screens/navigation/MyTabBar';
import Maps from './screens/attendance/Maps';
import Selfie from './screens/attendance/Selfie';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigator">
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{headerShown: false}} />
        {/* food */}
        <Stack.Screen name="Home" component={HomeScreen} />
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
        <Stack.Screen
          name="Delivery"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={DeliveryScreen}
        />

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
          name="StationeryDeliveryScreen"
          options={{presentation: 'fullScreenModal', headerShown: false}}
          component={StationeryDeliveryScreen}
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
