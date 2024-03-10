import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function PreparingProductScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('StationeryDeliveryScreen');
    }, 3000);
  }, []);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        className="rounded-lg h-80 w-80"
        source={{
          uri: 'https://www.partitionwizard.com/images/uploads/2023/07/windows-stuck-on-please-wait-1.png',
        }}
      />
    </View>
  );
}
