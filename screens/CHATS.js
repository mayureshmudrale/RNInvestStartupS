import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import {AntDesign,Ionicons} from 'react-native-vector-icons';
import { auth, db } from '../firebase';
import * as firebase from "firebase";
import { Input } from 'react-native-elements';

const CHATS = ({navigation,route}) => {
    const [textInput,setTextInput] = useState('');
    const [messages,setMessages] = useState([]);
    const [msgstate,setMsgstate ]=useState(true);
    useEffect(()=>{
        if(textInput.length===0){
            setMsgstate(true);
        }
        else{
            setMsgstate(false);
        }
    })
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params.toUser,
            headerTitleAlifn:"left",
            headerTitle:()=>(
                <View style={{flexDirection:"row",alignItems:"center"}}>
                     <Avatar.Image 

                     style={{marginLeft:-35}}
                        source={{
                        uri:route.params.tophotoURL
                        }} size={45}
        
                         />
                         <Text
                         style={{color:"white",
                         marginLeft:10,
                         fontWeight:"700",
                         fontSize:20,


                        }}
                         
                         >{route.params.toUser}</Text>
                </View>
            ),
            headerLeft:()=>(
                    <TouchableOpacity style={{marginLeft:5,}} onPress={()=>navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color='white'/>
                    </TouchableOpacity>
            )
        })
    })
    const sendMessage=()=>{
        db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:textInput,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURl:auth.currentUser.photoURL
        });

        db.collection('users')
        .doc(route.params.id)
        .collection('chats')
        .doc(auth.currentUser.uid)
        .collection('messages')
        .add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:textInput,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURl:auth.currentUser.photoURL
        });


        setTextInput('');
        
    }

    useLayoutEffect(()=>{
        const unsubscribe = db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot)=>setMessages(
            snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            }))
        ));

        return unsubscribe;
    },[route])
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={90}>
                <>
                    <ScrollView>
                     {messages.map(({id,data})=>(
                         data.email ===auth.currentUser.email?(
                             <View key={id} style={styles.receiver}>
                                 <Avatar.Image source={{uri:data.photoURl}}  size={25}  />
                                 <Text style={styles.receiverText}>{data.message}</Text>
                             </View>
                         ):(
                                <View key={id} style={styles.sender}>
                                     <Avatar.Image source={{uri:data.photoURl}} size={25}/>
                                    <Text style={styles.sendertext}>{data.message}</Text>
                                </View>
                         )
                     ))}

                    </ScrollView>
                    <View style={styles.footer}>
                           
                           <TextInput placeholder="message" value={textInput}  onChangeText={(text)=>setTextInput(text)} style={styles.TextInput}/>
                           <TouchableOpacity activeOpacity={0.5} disabled={msgstate} onPress={sendMessage}>
  
                              <Ionicons name="send" size={24} color="#2B68E6"/>
                           </TouchableOpacity>
                          </View>
                </>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default CHATS

const styles = StyleSheet.create({
    container:{
        flex:1
    }
    ,
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    TextInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    receiver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    }
})
