import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../theme';
export default function PreparingOrderScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      {/* <Image
        source={require('../assets/images/delivery.gif')}
        className="h-80 w-80"
      /> */}
      <Image
        className="rounded-lg h-80 w-80"
        source={{
          uri: 'https://thumbs.dreamstime.com/b/restaurant-chef-dish-smartphone-flat-vector-illustration-online-food-order-fast-home-delivery-service-appeared-231455168.jpg',
        }}
      />
    </View>
  );
}
