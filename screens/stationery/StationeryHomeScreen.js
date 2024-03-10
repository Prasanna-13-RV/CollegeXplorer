import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Categories from '../../components/categories';
import FeatureRow from '../../components/featuredRow';
// import { getFeaturedResturants } from '../api';
import * as Icon from 'react-native-feather';
import {themeColors} from '../../theme';

export default function StationeryHomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  useEffect(() => {
    const categories = [
      {
        _id: 'category1',
        name: 'Stationery',
        resturants: [
          {
            _id: 'Stationery',
            name: 'Stationery',
            image:
              'https://content3.jdmagicbox.com/comp/lucknow/k7/0522px522.x522.130130163351.x2k7/catalogue/balaji-stationery-gomti-nagar-lucknow-stationery-shops-vdjrp5m4e6.jpg',
            rating: 4.5,
            type: {name: 'Stationery Shop'},
            description: 'A great stationery in town.',
            dishes: [
              {
                key: 1,
                id: 'pencil',
                name: 'Pencil',
                description:
                  'A pencil is a writing or drawing implement with a solid pigment core in a protective casing that reduces the risk of core breakage.',
                price: 2,
                image:
                  'https://musgravepencil.com/cdn/shop/products/Havest_CedarPencil_1024x1024@2x.jpg?v=1576593212',
              },
            ],
            lng: -73.9876,
            lat: 40.7488,
          },
          {
            _id: 'restaurant33',
            name: 'Tea Time',
            image:
              'https://imgmedia.lbb.in/media/2023/05/64535509e9aae033ccb29a32_1683182857598.jpg',
            rating: 4.5,
            type: {name: 'Cuisine 1'},
            description: 'A great restaurant in town.',
            dishes: ['Dish 1', 'Dish 2'],
            lng: -73.9876,
            lat: 40.7488,
          },
        ],
        description: 'Description of Category 1',
        _type: 'featured',
      },
      {
        _id: 'category2',
        name: 'Lunch',
        resturants: [
          {
            _id: 'restaurant2',
            name: 'Stationery 2',
            image:
              'https://5.imimg.com/data5/NT/XY/MY-11113793/stationery-display-rack.jpg',
            rating: 4.2,
            type: {name: 'Cuisine 2'},
            description: 'Another fantastic restaurant.',
            dishes: ['Dish 3', 'Dish 4'],
            lng: -74.0094,
            lat: 40.7128,
          },
          // Add more restaurants as needed
        ],
        description: 'Description of Category 2',
        _type: 'featured',
      },
      // Add more categories as needed
    ];
    setFeaturedCategories(categories);
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Resturants"
            className="ml-2 flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">CIT</Text>
          </View>
        </View>
        <View
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="p-3 rounded-full">
          <Icon.Sliders
            height={20}
            width={20}
            strokeWidth="2.5"
            stroke="white"
          />
        </View>
      </View>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        {/* categories */}
        <Categories />

        {/* featured */}
        <View className="mt-5">
          {featuredCategories?.map(category => {
            return (
              <FeatureRow
                key={category._id}
                id={category._id}
                title={category.name}
                resturants={category?.resturants}
                description={category.description}
                featuredCategory={category._type}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
