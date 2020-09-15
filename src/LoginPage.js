import React from 'react';
import { StyleSheet, Text, View, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import SignUp from './SignUpPage';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';


export default class LoginPage extends React.Component{
constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        isLoggedIn:'0',
    }
}


login=async ()=>{
        try {
            let email=await AsyncStorage.getItem('email')
            let password=await AsyncStorage.getItem('password')
            if(email===this.state.email && password===this.state.password){
                await AsyncStorage.setItem('isLoggedIn','1')
                this.props.navigation.navigate('Details')
            }
            else{
                alert("Username or Password is incorrect");
            }
            
        
        } catch (error) {
           alert(error); 
        }
    }

getData=async()=>{
    try {
      const username=await AsyncStorage.getItem('username')
      if(username!==null){
        this.setState({username})
      }
      const email=await AsyncStorage.getItem('email')
      if(email!==null){
        this.setState({email})
      }
      const password=await AsyncStorage.getItem('password')
      if(password!==null){
        this.setState({password})
      }
      }catch(error){

      }
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
    onPress={this.login}
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