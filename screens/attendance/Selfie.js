import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';
import { useNavigation } from '@react-navigation/native';
import {Cloudinary} from "@cloudinary/url-gen";
import { upload } from 'cloudinary-react-native';
const Selfie = () => {
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dqx0eyiow'
    },
    
    url: {
        secure: true
    }
});  const navigation = useNavigation();

  const [picture, setpicture] = useState(
    'https://previews.123rf.com/images/aguiters/aguiters1508/aguiters150800059/43551287-photo-camera-icon.jpg',
  );
  const [toggle, settoggle] = useState(true);
  const requestCameraPermission = async () => {
    try {
      const CAMERA_PERMISSION_REQUEST_CODE = 123;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
          requestCode: CAMERA_PERMISSION_REQUEST_CODE,
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({
          mediaType: 'photo',
          cameraType: 'font',
        });
        console.log('Camera result:', result);
        
    
    

        const img = await uploadToCloudinary(result?.assets[0].uri,result?.assets[0].fileName,result?.assets[0].type)
        setpicture(img);
        settoggle(false);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
//   const uploadToCloudinary = async (imagePath,fileName,type) => {
//     try {

//     // cld.setConfig({
   
//     //   cloud:"dqx0eyiow",
//     //   url:"cloudinary://469344161745916:Osuo6GsBn2QUkVPuZi8njErKZ5k@dqx0eyiow",
//     //   api:"469344161745916"
      
//     // })
     
    
//     const options = {
//         upload_preset: 'student',
//         tag: 'sample',
//         api_key:"469344161745916",
//         unsigned: true

//     }
    
//     await upload(cld, {file:{uri:imagePath,type:type,name:fileName} , options: options, callback: (error, response) => {
//       console.log(error);
//         //.. handle response
//         return response;
//     }})
//         // This will be the URL of the uploaded image
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//         throw error;
//     }
// };
const uploadToCloudinary = async (imagePath,fileName,type) => {
  try {
const data = new FormData()
data.append("file",{uri:imagePath,type:type,name:fileName}),
data.append("upload_preset","student")
data.append("cloud_name","dqx0eyiow")
   
  
  
const response = await fetch("https://api.cloudinary.com/v1_1/dqx0eyiow/image/upload", {
  method: "POST",
  body: data
});

if (!response.ok) {
  throw new Error('Failed to upload image to Cloudinary');
}
         
const json = await response.json();
return json.secure_url;
      // This will be the URL of the uploaded image
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
  }
};
  const checkPermissionOFGps = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Gps Permission',
          message:
            'Cool Photo App needs access to your Gps ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        if (location) {
          navigation.navigate('Maps', {
            latitude: location.latitude,
            longitude: location.longitude,
            picture,
          });
        }
        else {
          console.log('location not found');
        }
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'left',
          color: 'black',
          fontWeight: '300',
          textDecorationLine: 'underline',
        }}>
        Take A SELFIE
      </Text>

      <View style={{flex: 1, paddingVertical: 10}}>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#F3F3F3',
            flex: 0.7,
            justifyContent: 'center',
          }}>
          <Image
            style={{flex: 1, resizeMode: 'contain'}}
            source={{uri: picture}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={toggle}
          onPress={() => {
            checkPermissionOFGps();
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: toggle ? 'gray' : 'black',
            height: 60,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              color: 'white',
              fontWeight: '300',
            }}>
            CONTINUE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selfie;
