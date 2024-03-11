import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import ResturantCard from './resturantCard';
import {getFeaturedResturantById} from '../api';
import * as Icon from 'react-native-feather';
import {themeColors} from '../theme';

export default function FeatureRow({title, description, items}) {
  // const [resturants, setResturants] = useState([]);

  // useEffect(() => {
    // getFeaturedResturantById(id).then(data=>{
    //   // console.log('got data: ',data);
    //   setResturants(data?.resturants);
    // })
  // }, [id]);
  // console.log(id, title, description, resturants);

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-gray-900 text-lg">{title}</Text>
          <Text className="text-gray-900 text-xs">{description}</Text>
        </View>

        <TouchableOpacity>
          <Text style={{color: themeColors.text}} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5">
        {items.map(item => {
          console.log(item);
          return (
            <ResturantCard
             
              id={item._id}
              imgUrl={item.shopImage}
              title={item.name}
              // rating={resturant.rating}
              // type={resturant.type?.name}
              address={item.loc}
              description={item.description}
              dishes={item.products}
           
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
