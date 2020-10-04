import React from 'react';
import { StyleSheet, Text, View, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import SignUp from './SignUpPage';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';


export default class LoginPage extends React.Component{

  state={email:'',password:''}

constructor(props){
    super(props);
}


handleLogin=()=>{
  var errorCode;
    var errorMessage;
  const { email, password } = this.state
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Details'))
      .catch(function(error){
        errorCode = error.code;
    errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    this.props.navigation.navigate('Details');
  }
      });
}

render(){
    return<View style={styles.container}>
    <Text style={styles.header}>LOGIN</Text>
    <TextInput style={styles.textinput} 
    placeholder="Your Email" 
    placeholderTextColor='white' 
    keyboardType={'email-address'}
    ref={(input)=>this.email=input}
    onChangeText={(email)=>this.setState({email})}
    value={this.state.email}
    />

    <TextInput style={styles.textinput} 
    placeholder="Your Password" 
    placeholderTextColor='white' 
    keyboardType={'default'} 
    ref={(input)=>this.email=input}
    secureTextEntry={true}
    onChangeText={(password)=>this.setState({password})}
    value={this.state.password}
    />

    <TouchableOpacity
    onPress={this.handleLogin}
    >
    <Text style={styles.ltext}>Login</Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
    style={styles.login}
    onPress={()=>this.props.navigation.navigate('Home')}> 
    <Text style={styles.ltext}>No account?Sign Up</Text>
    </TouchableOpacity>
    
    </View>
}

}

const styles=StyleSheet.create({
    container:{
    alignItems:'center',
    flex:1,
    justifyContent:'center',
    backgroundColor:'#007664',
    paddingLeft:60,
    paddingRight:60,
    },
    header:{
      fontSize:45,
      fontWeight:'bold',
      alignSelf:'center',
      color:'rgb(255,255,255)',
      paddingBottom:10,
      marginBottom:40,
      borderBottomColor:'rgb(255,255,255)',
      borderBottomWidth:1
  },
  textinput:{
      textAlign:'center',
      width:"90%",
      height:50,
      marginBottom:10,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius:30,
      fontSize:15,
      color:'white'
  },
  ltext:{
    color:'white',
    alignSelf:'center',
    paddingTop:30,
    fontSize:20,
    textDecorationLine:'underline',
  },
});