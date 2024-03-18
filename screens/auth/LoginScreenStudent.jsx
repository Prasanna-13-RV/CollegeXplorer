import { View, Text, TextInput } from 'react-native'
import {useState} from 'react'
import LoginScreen from 'react-native-login-screen'
import { createUser, getUser } from '../../axios/auth';
import { setUser } from '../../slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const LoginScreenStudent = () => {  
  let dispatch = useDispatch();
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigation = useNavigation();

  return (
    <LoginScreen
  // logoImageSource={require('./assets/logo-example.png')}
  onLoginPress={() => { 
    console.log("res.data");
    getUser(username,password).then((res)=>{
      console.log(res.data);
      dispatch(
        setUser({
          _id:res.data._id,
         name:res.data.name,
         email:res.data.email,
         registerNumber:res.data.registerNumber,
         className:res.data.className
         
        }),
      );
      navigation.navigate("BottomTabNavigator")
    })
  }}
  onSignupPress={() => {
    navigation.navigate("Signup")

  }}
  onEmailChange={setUsername}
  loginButtonText={'Login'}
  signupText='Create an Account'

  
  disableSocialButtons

  textInputChildren={
    <View style={{marginTop: 16}}>
      {/* <TextInput
        placeholder="Re-Password"
        secureTextEntry
        onChangeText={setRepassword}
      /> */}
    </View>
  }
  onPasswordChange={setPassword}
/>
  )
}

export default LoginScreenStudent