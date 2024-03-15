import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import { createUser } from '../../axios/auth';
import { setUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required'),
    registerNo: yup.string().required('Register Number is required'),
    password: yup.string().required('Password is required'),

});

export const SignupScreenStudent = () => {
  const navigation = useNavigation();
  let dispatch = useDispatch();

  const handleRegister = values => {
    console.log('values', values);
    try {
        createUser(values).then((res)=>{
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
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingVertical: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            registerNo: '',
            password: ''
            
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  textAlign: 'center',
                }}>
                Register
              </Text>

              {/* Name field */}
              <View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholder="Enter Name"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Email Field */}
              <View>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Enter Email"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Shop Name Field */}
              <View>
                <Text style={styles.label}>Register Number</Text>
                <TextInput
                  style={styles.input}
                  value={values.registerNo}
                  onChangeText={handleChange('registerNo')}
                  placeholder="Enter Shop Name"
                />
                {touched.registerNo && errors.registerNo && (
                  <Text style={styles.errorText}>{errors.registerNo}</Text>
                )}
              </View>

              {/* Shop Description Field */}
              <View>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Enter Password"
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>



              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}>
                <Text style={styles.registerButtonText}>Sign up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLinkText}>
                  Already have an account
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#3498db',
    marginBottom: 10,
    textAlign: 'right',
  },
  loginLinkText: {
    color: '#3498db',
    margin: 10,
    textAlign: 'center',
  },
});