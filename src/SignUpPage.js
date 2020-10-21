import React,{useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView, TextInput ,Button, StatusBar, TouchableOpacity, Image } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import auth from '@react-native-firebase/auth';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';



var gender=[
   {label:"Male",value:'Male'},
	 {label:"Female",value:'Female'},
   {label:"Other",value:'Other'},
];



export default class SignUp extends React.Component{
  
  constructor(props){
    super(props);
    this.dbRef=firestore().collection('users');
    this.state={
    username:"",
    email:"",
    password:"",
    gender:'',
    date:'',
    isLoading:false,
    user:{
      image:'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/128x128/shadow/user_add.png',
    }
  };
    }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  

  onSubmit=async()=>{
  if(this.state.username === ''||this.state.email === ''||this.state.password === ''||this.state.gender === ''||this.state.date === ''){
    alert("Fill all the fields please");
  }
  else{
    try {
      auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      alert("Account created");
    })
    .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  })
    } catch (error) {
      console.error();
    }
    this.setState({isLoading:true,});
    this.dbRef.add({
      username:this.state.username,
      email:this.state.email,
      gender:this.state.gender,
      date:this.state.date,
    }).catch((e)=>{
        console.log(e);
        this.setState({
          isLoading:false,
        })
      })
  }
  }

CameraPhoto=()=>{
    ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(
  image=>{
    this.subscriber=firestore().collection('users').doc('Aw1LdNN1tirPlYYWXbKH').onSnapshot(doc=>{
    this.setState({
      user:{
        image:image.path
      }
    })
    })
    firestore().collection('users').doc('Aw1LdNN1tirPlYYWXbKH').update({
      image:image.path
    })
  }
);
  }

  GalleryPhoto=()=>{
    ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
}).then(
  image=>{
    this.subscriber=firestore().collection('users').doc('Aw1LdNN1tirPlYYWXbKH').onSnapshot(doc=>{
    this.setState({
      user:{
        image:image.path
      }
    })
    })
    firestore().collection('users').doc('Aw1LdNN1tirPlYYWXbKH').update({
      image:image.path
    })
  }
);
  }
  
  bs=React.createRef()
  fall=new Animated.Value(1)
  inner=()=>(
    <View style={styles.panel}>
    
    <Text style={styles.text1}>Profile picture</Text>
    
    <TouchableOpacity
    onPress={this.GalleryPhoto}
    >
    <Text style={styles.text1}>Upload photo from gallery</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={this.CameraPhoto}
    >
    <Text style={styles.text1}>Take photo from Camera</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>this.bs.current.snapTo(1)}
    >
    <Text style={styles.text1}>Cancel</Text>
    </TouchableOpacity>
    </View>
  )
  header=()=>(
    <View style={styles.header1}>
    <View style={styles.panelHeader}>
    <View style={styles.panelHandle}>
    </View>
    </View>
    </View>
  )

  render(){
    return <View style={styles.signup}><StatusBar 
    backgroundColor='#004B3A'
    bar-style='light-content'
    />
    <Text style={styles.header}>SIGNUP  </Text>
  <BottomSheet
  style={styles.bottom}
  ref={this.bs}
  snapPoints={[330,0]}
  initialSnap={1}
  callbackNode={this.fall}
  enabledGestureInteraction={true}
  renderContent={this.inner}
  renderHeader={this.header}
  />
    <TouchableOpacity
    onPress={()=>this.bs.current.snapTo(0)}
    >
    <SafeAreaView
    style={{paddingBottom:10}}>
    <Image
    source={{uri:this.state.user.image}}
    style={{width: 80, height: 80, backgroundColor:'white'}}
    size={80}
    />
    </SafeAreaView>
    </TouchableOpacity>

    <TextInput style={styles.textinput} 
    placeholder="Your Name" 
    placeholderTextColor='white'
    autoCapitalize='words'
    onSubmitEditing={()=>this.email.focus()}
    value={this.state.username}
    onChangeText={(val) => this.inputValueUpdate(val, 'username')}
    />
     
    <TextInput style={styles.textinput} 
    placeholder="Your Email" 
    placeholderTextColor='white' 
    keyboardType={'email-address'}
    ref={(input)=>this.email=input}
    onSubmitEditing={()=>this.password.focus()}
    value={this.state.email}
    onChangeText={(val) => this.inputValueUpdate(val, 'email')}
    />

    <TextInput style={styles.textinput} 
    placeholder="Your Password" 
    placeholderTextColor='white' 
    keyboardType={'default'} 
    secureTextEntry={true}
    ref={(input)=>this.password=input}
    value={this.state.password}
    onChangeText={(val) => this.inputValueUpdate(val, 'password')}
    />
    
    <Text style={styles.text}>Gender:</Text>
    <RadioForm 
		  radio_props={gender}
      buttonSize={15}
      labelStyle={{fontSize: 15, color: 'rgb(255,255,255)',marginRight: 20 }}
      formHorizontal={true}
      buttonColor={'white'}
      selectedButtonColor={'white'}
		  onPress={(val) => this.inputValueUpdate(val.toString(), 'gender')}
      value={this.state.gender}
		  />
   

    <Text style={styles.text}>Date of Birth:</Text>
     <DatePicker
        style={styles.dtext}
        date={this.state.date}
        mode="date"
        placeholder="SELECT DATE"
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate={new Date()}
        onDateChange={(val) => this.inputValueUpdate(val, 'date')}
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
    onPress={
        this.onSubmit
    }
    style={styles.button}
    > 
    <Text style={styles.text1}>Submit</Text>
    </TouchableOpacity>
    <View style={styles.view1}>
    <TouchableOpacity 
    style={styles.login}
    onPress={()=>this.props.navigation.navigate('Login')}> 
    <Text style={styles.ltext}>Already have an account?Login</Text>
    </TouchableOpacity>
    </View>
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
    //paddingBottom:5
  },
  header:{
      fontSize:40,
      fontWeight:'bold',
      alignSelf:'center',
      color:'rgb(255,255,255)',
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
  header1: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottom:{
    width:'100%',
    backgroundColor:'white',
    alignSelf:'stretch',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel:{
    backgroundColor:'#EF5350',
    width:'100%'
  },
  login:{
    height:45,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:15,
  },
  view1:{
    paddingTop:20,
    alignSelf:'stretch',
    paddingRight:30,
    justifyContent:'center',
  },
  ltext:{
    color:'white',
    alignSelf:'center',
    paddingTop:1,
    fontSize:20,
    paddingBottom:30,
    textDecorationLine:'underline',
  },
});
