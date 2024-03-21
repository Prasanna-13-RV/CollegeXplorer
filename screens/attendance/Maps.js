import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { createAttendance } from '../../axios/shop';

const Maps = ({route}) => {
  const [message, setMessage] = useState('Student outside the college');

  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const picture = route.params.picture;
  const user = useSelector(selectUser)

  // 13.0443321 80.1374166

  const studentInOrOut = async () => {
    console.log(latitude, longitude);
   
    if (
      latitude > 10 &&
      latitude < 14 &&
      longitude > 78 &&
      longitude < 82
    ) {
      setMessage('Student inside the college');
      createAttendance(user._id,true,picture)
    
    } else {
      setMessage('Student outside the college');
      createAttendance(user._id,false,picture)

    }


  };

  useEffect(() => {
    studentInOrOut();
  }, []);
  console.log(latitude, longitude);

  console.log(picture);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={{uri: picture}} style={styles.cardImage} />
      <Text style={{color: '#000', fontSize: 20}}>{message}</Text>

      {/* <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker coordinate={{latitude: latitude, longitude: longitude}} />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 16,
    marginBottom: 10,
  },
});

export default Maps;
