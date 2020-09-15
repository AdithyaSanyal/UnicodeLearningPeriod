import React,{useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput ,Button, StatusBar, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'

var gender=[
   {label:"Male",value:'Male'},
	 {label:"Female",value:'Female'},
];


export default class SignUp extends React.Component{
  state={
    username:"",
    email:"",
    password:"",
    gender:'',
    date:'',
  }
  
  constructor(props){
    super(props);
    this.getData();
  }

  onSubmit=async()=>{
    try {
      await AsyncStorage.multiSet([['username',this.state.username],['email',this.state.email],['password',this.state.password],['gender',this.state.gender],['date',this.state.date]])
      alert("Data saved")
    } catch (error) {
      console.error();
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
      const gender=await AsyncStorage.getItem('gender')
      if(gender!==null){
        this.setState({gender})
      }
      const date=await AsyncStorage.getItem('date')
      if(date!==null){
        this.setState({date})
      }
    } catch (error) {
      console.error();
    }
  }

  

  render(){
    return <View style={styles.signup}>
    <StatusBar 
    backgroundColor='#004B3A'
    bar-style='light-content'
    />
    <Text style={styles.header}>SIGNUP  </Text>

    <TextInput style={styles.textinput} 
    placeholder="Your Name" 
    placeholderTextColor='white'
    autoCapitalize='words'
    onSubmitEditing={()=>this.email.focus()}
    value={this.state.username}
    onChangeText={val=>this.setState({username:val})}
    />
     
    <TextInput style={styles.textinput} 
    placeholder="Your Email" 
    placeholderTextColor='white' 
    keyboardType={'email-address'}
    ref={(input)=>this.email=input}
    onSubmitEditing={()=>this.password.focus()}
    value={this.state.email}
    onChangeText={val=>this.setState({email:val})}
    />

    <TextInput style={styles.textinput} 
    placeholder="Your Password" 
    placeholderTextColor='white' 
    keyboardType={'default'} 
    secureTextEntry={true}
    ref={(input)=>this.password=input}
    value={this.state.password}
    onChangeText={val=>this.setState({password:val})}
    />
    
    <Text style={styles.text}>Gender:</Text>
    <RadioForm 
		  radio_props={gender}
      buttonSize={15}
      labelStyle={{fontSize: 15, color: 'rgb(255,255,255)'}}
      buttonColor={'white'}
      selectedButtonColor={'white'}
		  onPress={val => this.setState({ gender: val.toString() })}
      value={this.state.gender}
		  />
   

    <Text style={styles.text}>Date of Birth:</Text>
     <DatePicker
        style={styles.dtext}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate={new Date()}
        onDateChange={val=>this.setState({date:val})}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 10,
            top: 4,
            marginLeft: 10
          },
          dateInput: {
            marginLeft: 10,
            marginRight:1,
            borderColor:'white',
            borderThickness:1,
          },
          dateText:{
            color:'white',
            fontSize:15
          },
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

    <View style={styles.view}>
    <TouchableOpacity 
    onPress={this.onSubmit}
    style={styles.button}
    > 
    <Text style={styles.text1}>Submit</Text>
    </TouchableOpacity>
    </View>

    

    </View>
  }
}

const styles = StyleSheet.create({
  signup: {
    alignItems:'center',
    flex:1,
    justifyContent:'center',
    backgroundColor:'#007664',
    paddingLeft:60,
    paddingRight:60,
  },
  header:{
      fontSize:40,
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
      height:50,
      width:300,
      marginBottom:10,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius:30,
      fontSize:15,
      color:'white'
  },
  text:{
    color:'white',
    alignSelf:'stretch',
    paddingBottom:10,
      
  },
  dtext:{
    borderBottomColor:'white',
    width:300
  },
  text1:{
    color:'white',
    alignSelf:'center',
    paddingTop:1,
    fontSize:25,
    fontWeight:'bold'
  },
  button:{
    borderWidth:1,
    height:45,
    width:700,
    width:'70%',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:15,
    backgroundColor:'#292F2F'
  },
  view:{
    paddingTop:20,
    alignSelf:'stretch',
    paddingLeft:70,
    justifyContent:'center',
  },
});