import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-paper'
import { auth, db } from '../firebase'

const ChatComponent = ({id,data,navigation}) => {//{id:toId,toUser:toName,tophotoURL:photoURl,toemail:email}
const [messages,setMessages] = useState([]);
console.log(messages?.[0])
useEffect(()=>{
    const unsubscribe = db.collection('users')
    .doc(auth.currentUser.uid)
    .collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>setMessages(
        snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        }))
    ));

    return unsubscribe;
},[])
return (
     <ListItem key={id} onPress={()=>{navigation.navigate('toChat',{id:id,toUser:data.toUser,tophotoURL:data.tophotoURL,toemail:data.toemail})}}>
         <Avatar.Image 
        
         source={{
             uri:data.tophotoURL
         }} 
         
         size={40}
         
         />

    <ListItem.Content>
        <ListItem.Title style={{fontWeight:"800"}}>
            {data.toUser}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}> 
          {messages?.[0]?.data.displayName}:{messages?.[0]?.data.message}
        </ListItem.Subtitle>
    </ListItem.Content>

     </ListItem>
     
    )
}

export default ChatComponent

const styles = StyleSheet.create({})
