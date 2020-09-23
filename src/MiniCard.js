import React,{useState} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MiniCard=(props)=>{
    const navigation = useNavigation();
    return(
        <TouchableOpacity
        onPress={()=>navigation.navigate('VideoScreen',{videoId:props.videoId})}
        >
        <View style={{flexDirection:'row',margin:10,marginBottom:0}}>
        <Image
        source={{uri:`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`}}
        style={{
            width:'45%',
            height:100,
        }}
        />
        <View style={{paddingLeft:5}}>
        <Text
        style={{fontSize:15,width:'100%'}}
        ellipsizeMode="tail"
        numberOfLines={3}
        >
        {props.title}</Text>
        <Text style={{fontSize:15}}>{props.channel}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}

export default MiniCard;