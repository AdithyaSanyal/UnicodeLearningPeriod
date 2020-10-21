import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TextInput, FlatList ,Button, StatusBar, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MiniCard from './MiniCard';

 const users=[];
export default class Favourites extends React.Component{
  constructor(props){
    super(props);
    this.getFrom();
  this.state={
    email:'',
    favourite:'',
    videos:[],
  }
  }

  getFrom=()=>{//.doc('LCCKYm289raRaLmhni3P')
      const userRef=firestore().collection('favourites').where('email', '==', auth().currentUser.email);
      userRef.onSnapshot(querySnapshot=>{
       
        querySnapshot.forEach(documentSnapshot=>{
          users.push({
            ...documentSnapshot.data(),
            key:documentSnapshot.id,
          });
          this.setState({
            videos:users,
          })
          console.log(users);
        });
      })
    }
  
  

  render(){
    
      return(
      <View style={styles.view}>
      <FlatList
      data={users}
      keyExtractor={item=>item.key}
      renderItem={({ item }) => (
        <MiniCard
        videoId={item.favourites}
        />
      )}
    />
      </View>
    
    )
  }
}

const styles=StyleSheet.create({
  view:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'stretch',
  },
})

