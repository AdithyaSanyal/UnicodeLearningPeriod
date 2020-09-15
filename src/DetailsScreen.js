import React from 'react';
import { StyleSheet, Text, View, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import SignUp from './SignUpPage';
import LoginPage from './LoginPage';


function SearchPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Search Page!</Text>
    </View>
  );
}

function Favourites() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the Favourites Page!</Text>
    </View>
  );
}

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
    this.getData();
    this.state={
        email:'',
        username:'',
        date:'',
    }
    }

    getData=async()=>{
    const email=await AsyncStorage.getItem('email')
      if(email!==null){
        this.setState({email})
      }
      const username=await AsyncStorage.getItem('username')
      if(username!==null){
        this.setState({username})
      }
      const gender=await AsyncStorage.getItem('gender')
      if(gender!==null){
        this.setState({gender})
      }
      const date=await AsyncStorage.getItem('date')
      if(date!==null){
        this.setState({date})
      }
    
  }

    render(){
        return (
        <View style={styles.container}>
        <Icon name="ios-person" style={styles.icon} size={150}/>
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


