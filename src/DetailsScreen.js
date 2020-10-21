import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import SignUp from './SignUpPage';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import Favourites from './FavouritesScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Tab = createMaterialBottomTabNavigator();

export default class MyTabs extends React.Component{
  render(){
    return <Tab.Navigator
      initialRouteName="Details"
      activeColor="white"
      shifting={true}
      labeled={true}
    >

    <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarColor:'#ff0028',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="body" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: 'SearchPage',
          tabBarColor:'#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
          tabBarColor:'#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  }
}
export class Details extends React.Component{
    constructor(props){
    super(props);
    this.getFrom();
    this.getData();
    this.state={
        id:'',
        email:'',
        username:'',
        date:'',
        gender:'',
        user:{
      image:'',
             }
    }
    }

    signOut=()=>{
      auth().signOut()
      .then(()=>alert("User has signed out"))
      this.props.navigation.navigate("Login")
    }

    getFrom=()=>{
      const userRef=firestore().collection('users').where('email', '==', auth().currentUser.email);
      userRef.get().then(querySnapshot=>{
        querySnapshot.forEach(documentSnapshot => {
      const id=documentSnapshot.id;
      this.setState({
        username:documentSnapshot.data().username,
        email:documentSnapshot.data().email,
        gender:documentSnapshot.data().gender,
        date:documentSnapshot.data().date,
        user:{
      image:documentSnapshot.data().image,
             }
      })
    });
      }

      );
    }

    getData=async()=>{
    auth().onAuthStateChanged((user) => {
  if (user) {
    const email=user.email;
    this.setState({email})
  }
});
  }

    render(){
        return (
        <View style={styles.container}>
        
        <SafeAreaView
        style={{paddingBottom:10}}>
        <Image
        source={{uri:this.state.user.image}}
        style={{width: 180, height: 180, backgroundColor:'white'}}
        />
        </SafeAreaView>

        <View style={styles.section}>
        <Text style={styles.nameh}>Name:</Text>
        <Text style={styles.name}>{this.state.username}</Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.nameh}>Email:</Text>
        <Text style={styles.name}>{this.state.email}</Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.nameh}>Sex:</Text>
        <Text style={styles.name}>{this.state.gender}</Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.nameh}>Date of Birth:</Text>
        <Text style={styles.name}>{this.state.date}</Text>
        </View>
        <View style={styles.button}>
        
        <TouchableOpacity
        onPress={this.signOut}
        >
        <Text style={styles.nameh}>LOGOUT</Text>
        </TouchableOpacity>
        </View>
        
        </View>

        )
    }
}
const styles=StyleSheet.create({
  container:{
    alignItems:'center',
    flex:1,
    justifyContent:'center',
    backgroundColor:'#007664',
    
  },
  button:{
    marginVertical:50,
  },
  section:{
    flexDirection:'row',
  },
  icon:{
    color: "white", 
  borderRadius:30,
  borderWidth: 2,
  borderColor: 'white',
  },
  nameh:{
    paddingTop:35,
    fontSize:25,
    color: "white", 
    textDecorationLine:'underline',
    flexDirection:'row',
  },
  name:{
    paddingTop:35,
    fontSize:25,
    color: "white", 
    flexDirection:'row',
  },
  email:{
    paddingTop:25,
    fontSize:25,
    color: "white", 
    textDecorationLine:'underline',
    flexDirection:'row',
  },
  sex:{
    paddingTop:25,
    fontSize:25,
    color: "white",
    textDecorationLine:'underline',
    flexDirection:'row', 
  },
  dob:{
    paddingTop:25,
    fontSize:25,
    color: "white",
    textDecorationLine:'underline',
    flexDirection:'row', 
  }
});


