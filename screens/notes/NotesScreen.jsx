import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import {Avatar, Button, ListItem} from '@ui-kitten/components';
import {getNotes} from '../../axios/notes';
import {useSelector} from 'react-redux';
import {selectUser} from '../../slices/userSlice';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const NotesScreen = () => {
  const user = useSelector(selectUser);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes('IT').then(res => {
      console.log(res.data);
      setNotes(res.data);
    });
  }, []);
  return (
    // <View style={styles.main}>
    //    {notes && notes.length>0 && notes.map((data) => {
    //     console.log("data",data);
    //     return (
    //         <View style={styles.card}>
    //       <Text style={styles.profileTitle}>{data.title}</Text>
    //       {/* <TouchableOpacity
    //   onPress={() => {

    //   }}>
    //   <View style={styles.profileAction}>
    //     <Text style={styles.profileActionText}>Download</Text>
    //   </View>
    // </TouchableOpacity> */}
    //         </View>
    //     )
    //    })}
    // </View>
    <ScrollView style={{flex: 1,minHeight:"100%"}}>
      <View className="min-h-full" style={styles.container}>
        {notes &&
          notes.length > 0 &&
          notes.map(data => {
            return (
              <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>{data.title}</Text>
                  <TouchableOpacity onPress={()=>Linking.openURL(data.notes)} className="bg-blue-400 py-3 px-5 rounded-md mt-3">
                    <Text style={styles.subtitle}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: '90%',
    marginTop: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    zIndex: 30,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#444444',
    textAlign: 'center',
  },
});
export default NotesScreen;
