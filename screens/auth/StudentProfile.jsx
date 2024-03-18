import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {selectUser, setUser} from '../../slices/userSlice';
import {PERMISSIONS, request} from 'react-native-permissions';

export default function StudentProfile() {
  const user = useSelector(selectUser);
  let dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(user);
  const [imageUrl, setImageUrl] = useState(user.userImage);

  const [form, setForm] = useState({
    name: userDetails.name,
    email: userDetails.email,
  });

  const sheet = useRef();

  const editProfile = () => {
    sheet.current.open();
  };

  const editProfileFunction = () => {
    try {
      axios
        .put(
          `https://busy-ruby-snail-boot.cyclic.app/api/user/update/${user._id}`,
          form,
        )
        .then(res => {
          sheet.current.close();
          dispatch(
            setUser({
              _id: res.data._id,
              name: res.data.name,
              email: res.data.email,
              registerNumber: res.data.registerNumber,
              className: res.data.classNamev,
            }),
          );
          Alert('Success', 'Profile updated successfully');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadToCloudinary = async (imagePath, fileName, type) => {
    try {
      const data = new FormData();
      data.append('file', {uri: imagePath, type: type, name: fileName}),
        data.append('upload_preset', 'student');
      data.append('cloud_name', 'dqx0eyiow');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dqx0eyiow/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

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

  const handleImageUpload = async () => {
    try {
      // Check and request permissions for accessing the camera and gallery
      const permissionResult = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        }),
      );

      if (permissionResult !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Please grant permission to access photos',
        );
        return;
      }

      // Configure image picker options
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      // Launch image picker
      ImagePicker.showImagePicker(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          // Upload image to Cloudinary
          const uploadedImageUrl = await uploadToCloudinary(
            response.uri,
            response.fileName,
            response.type,
          );
          setImageUrl(uploadedImageUrl);
        }
      });
    } catch (error) {
      console.error('Error handling image upload:', error);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#f6f6f6', paddingHorizontal: 15}}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.profile}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <TouchableOpacity onPress={handleImageUpload}>
                <Image
                  alt=""
                  source={{
                    uri:
                      imageUrl ||
                      'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg',
                  }}
                  style={styles.avatarImg}
                />
              </TouchableOpacity>

              <View style={styles.avatarNotification} />
            </View>

            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{user.name}</Text>

              <Text style={styles.profileSubtitle}>{user.email}</Text>
            </View>
          </View>

          <Text style={styles.profileDescription}>
            Class Name :{' '}
            <Text style={{color: '#266EF1'}}>{user.className}</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            editProfile();
          }}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Edit Profile</Text>
            <FeatherIcon color="#fff" name="edit-3" size={16} />
          </View>
        </TouchableOpacity>
      </View>
      <RBSheet
        customStyles={{container: styles.sheet}}
        height={360}
        openDuration={250}
        ref={sheet}>
        <View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={name => setForm({...form, name})}
              placeholder="Name"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              defaultValue={user.name}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => setForm({...form, email})}
              placeholder="Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              defaultValue={user.email}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              editProfileFunction();
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    backgroundColor: '#fff',
    padding: 24,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    paddingVertical: 5,
    color: '#778599',
  },
  profileDescription: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  profileTags: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileTagsItem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#266ef1',
    marginRight: 4,
  },
  /** Avatar */
  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },
  avatarNotification: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: '#22C55E',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  sheet: {
    padding: 20,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});
