import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity} from 'react-native';
import YouTube from 'react-native-youtube';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default class VideoScreen extends React.Component {
  constructor(props){
    super(props);
    
    this.dbRef=firestore().collection('favourites');
    // this.setState({
    //   videoId:this.props.route.params.videoId,
    // })
  }
  state={
    videoId:'',
    isReady: false,
    status: 'buffering',
    quality: 'medium',
    error: null,
    fullscreen: false,
    isPlaying: true,
    isLooping: true,
    currentTime: 0,
    duration:0,
  };

    // const dbRef=firestore().collection('users').where('email', '==', auth().currentUser.email);
    // this.dbRef.add({
    //   favourites:this.state.videoId,
    // })
    //.where('email', '==', auth().currentUser.email);

  addToFavourites=async(videoId)=>{
    alert('Added to Favourites');
    var currentUser=await auth().currentUser;
    this.dbRef.add({
      email:auth().currentUser.email,
      favourites:this.props.route.params.videoId,
    })
  }

  render(){  
    const dbRef=firestore().collection('users').where('email', '==', auth().currentUser.email);
    const videoId = this.props.route.params.videoId;
    return(
    <View>
    <YouTube
      ref={(component) => { this._videoPlayer = component }}//Sometimes we need to change the properties of DOM without using state and props. In that case, we use Refs.
      apiKey="AIzaSyCjhvX0Yf39nAUt9aZ-iCkZEsawEkjY734"
      videoId={videoId}
      play={this.state.isPlaying}
      fullscreen={this.state.fullscreen}
      loop={this.state.isLooping}
      onReady={e => this.setState({ isReady: true })}
      onChangeState={e => this.setState({ status: e.state })}
      onChangeQuality={e => this.setState({ quality: e.quality })}
      onError={e => this.setState({ error: e.error })}
      controls={1}
      onProgress={e =>this.setState({
      duration: e.duration,
      currentTime: e.currentTime,
      })
      }
      style={{ alignSelf: 'stretch', height: 300 }}
/>
<View style={styles.container1}>
<View style={styles.container}>

<TouchableOpacity
onPress={() => this.setState(s => ({ isPlaying: !s.isPlaying }))}
style={styles.button}
>
<Text style={styles.buttonText}>{this.state.status=='playing'?'Pause':'Play'}</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.button1}
onPress={()=>this._videoPlayer.seekTo(0)}
>
<Text style={styles.buttonText}>Start Over</Text>
</TouchableOpacity>


<View style={styles.view}>
<Text style={styles.buttonText1}>Status:{this.state.status}</Text>
</View>


<TouchableOpacity style={{flexDirection:'row'}}
onPress={()=>{this.addToFavourites(videoId);}}
//this.addToFavourites(videoId)
>
<Icon
name="md-star" size={32}
/>
<Text style={styles.buttonText1}> Add to favourites</Text>
</TouchableOpacity>
</View>



</View>
</View>
 )}
}

const styles=StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:50,
    backgroundColor:"#676688"
  },
  container1:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#676688"
  },
  buttonText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#54000D'
  },
  buttonText1:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000000',
  },
  button:{
    borderWidth:1,
    borderColor:'white',
    backgroundColor:'#00D509',
    borderRadius:40,
    width:200,
    height:50,
    alignItems:'center',
    justifyContent:'center',
  },
  button1:{
    borderWidth:1,
    borderColor:'white',
    backgroundColor:'#00D509',
    borderRadius:40,
    width:200,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
  },
  view:{
    paddingBottom:50,
  }
})