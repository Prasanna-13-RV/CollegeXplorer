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

export default function HomeScreen() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  useEffect(() => {
    const categories = [
      {
        _id: 'category1',
        name: 'Snacks',
        resturants: [
          {
            _id: 'restaurant1',
            name: 'Cafe',
            image:
              'https://b.zmtcdn.com/data/collections/2e5c28a5fbcb2b35d84c0a498b0e1ba2_1674823998.jpg?fit=around|562.5:360&crop=562.5:360',
            rating: 4.5,
            type: {name: 'Cuisine 1'},
            description: 'A great restaurant in town.',
            dishes: [
              {
                key: 1,
                id: 'dish1',
                name: 'Samosa',
                description:
                  'The samosa is prepared with an all-purpose flour (locally known as maida) and stuffed with a filling, often a mixture of diced.',
                price: 12,
                image:
                  'https://www.kitchensanctuary.com/wp-content/uploads/2023/10/Samosa-square-FS.jpg',
              },
              {
                key: 2,
                id: 'dish2',
                name: 'Cool drink',
                description:
                  'Cool drinks mean non alcoholic, aerated juices, artificial or semi artificial juices like orange, lime, apple , cola water, black tea, lemon tea and cool caffeine drinks. These are also called as soft drinks.',
                price: 20,
                image:
                  'https://images.herzindagi.info/image/2022/May/cold-drink-hacks-to-know.jpg',
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
          {
            _id: 'restaurant3s3',
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
          // Add more restaurants as needed
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
            name: 'Restaurant 2',
            image:
              'https://b.zmtcdn.com/data/collections/2e5c28a5fbcb2b35d84c0a498b0e1ba2_1674823998.jpg?fit=around|562.5:360&crop=562.5:360',
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
    // getFeaturedResturants().then(data=>{
    //     setFeaturedCategories(data);
    // })
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
