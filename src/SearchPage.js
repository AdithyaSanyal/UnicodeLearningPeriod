import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput,ScrollView,FlatList,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MiniCard from './MiniCard';

const apiKey='AIzaSyCjhvX0Yf39nAUt9aZ-iCkZEsawEkjY734';

//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=songs&type=video&key=${apiKey}
const SearchPage=()=> {
    const [value,setValue]=useState("");
    const [loading,setloading]=useState(false)
    const [miniCard,setminiCard]=useState([]);
    const fetchData=()=>{
      setloading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&type=video&key=${apiKey}`)
        .then(res=>res.json())
        .then(
            data=>{
                setloading(false)
                setminiCard(data.items)
            }
        )
    }
  return (
    <View style={{flex:1}}>
    <View style={{ padding:5,flexDirection:"row",justifyContent:'space-around'}}>
      <Icon name="arrow-back" size={32}/>
      <TextInput
      style={styles.textinput}
      value={value}
      onChangeText={(text)=>setValue(text)}
      />
      <Icon 
      name="send-sharp" 
      size={32}
      onPress={()=>fetchData()} 
      />
      </View>
      {loading?<ActivityIndicator size='large'/>:null}
      <FlatList
      data={miniCard}
      renderItem={({item})=>{
        console.log({item});
        return <MiniCard
        videoId={item.id.videoId}
        title={item.snippet.title}
        channel={item.snippet.channelTitle}
        />
      }}
      keyExtractor={item=>item.id.videoId}
      />
    </View>
  );
}

const styles=StyleSheet.create({
    textinput:{
        width:'75%',
        backgroundColor:'#b4b6d6',
        borderRadius:25,
    }
})

export default SearchPage;