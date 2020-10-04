import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import SignUp from './SignUpPage';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


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

    state={
        email:'',
        username:'',
        date:'',
        user:{
      image:'',
             }
    }

    constructor(props){
    super(props);
    this.getData();
    this.subscriber=firestore().collection('users').doc('Aw1LdNN1tirPlYYWXbKH').onSnapshot(doc=>{
    this.setState({
      user:{
        image:doc.data().image
      }
    })
    })
    }

    signOut=()=>{
      auth().signOut()
      .then(()=>alert("User has signed out"))
      this.props.navigation.navigate("Login")
    }

    getData=async()=>{
    auth().onAuthStateChanged((user) => {
  if (user) {
    const email=user.email;
    this.setState({email})
  }
});
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


