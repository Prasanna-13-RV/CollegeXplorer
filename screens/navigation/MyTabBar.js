import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../food/HomeScreen';
import StationeryHomeScreen from '../stationery/StationeryHomeScreen';
import Selfie from '../attendance/Selfie';

const Tab = createBottomTabNavigator();

export const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            android_ripple={{color: '#673ab7'}} // Ripple effect color for Android
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={({pressed}) => ({
              flex: 1,
              opacity: pressed ? 0.5 : 1,
              alignItems: 'center',
            })}
            key={route.key}>
            <Text
              style={{
                color: isFocused ? '#fff' : '#673ab7',
                backgroundColor: isFocused ? '#673ab7' : '#fff',
                width: '100%',
                textAlign: 'center',
                padding: 16,
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Food" component={HomeScreen} />
      <Tab.Screen name="Stationery" component={StationeryHomeScreen} />
      <Tab.Screen name="Attendance" component={Selfie} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
