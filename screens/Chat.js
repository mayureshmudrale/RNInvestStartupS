import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { StyleSheet, Text, View  } from 'react-native'
import { auth, db } from '../firebase'
import ChatComponent from './ChatComponent'
import CHATS from './CHATS'
import SelectContact from './SelectContact'


const Chat = ({navigation}) => {

    const[Chats,setChats] = useState([]);
    
    console.log("chats",Chats)
    const Tab = createMaterialTopTabNavigator();
    const globalScreenOption={
        activeTintColor:"white",
        inactiveTintColor:"black",
        style :{ backgroundColor: '#2C6BED' },
        pressColor :"powerblue"

      }

      useEffect(()=>{
          const unsubscribe = db.collection('users')
          .doc(auth.currentUser.uid)
          .collection('chats')
          .onSnapshot(snapshot=>{
              setChats(snapshot.docs.map(doc=>({ 
                  id:doc.id,
                  data:doc.data()
              })))
          })

          return unsubscribe;
      },[])


      const chat =()=>{
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                   {Chats.map(({ id,data   })=>{
                      return( <ChatComponent 
                      id={id}
                      data={data}
                      key={id}
                      navigation={navigation}
                      />)
                   })}
                 
                </ScrollView>
            </SafeAreaView>
    
        )
    }

    

    return (
        <Tab.Navigator tabBarOptions={globalScreenOption}>
        <Tab.Screen name="Chat" component={chat} />
        <Tab.Screen name="Select Contact"  component={SelectContact} />
       
        
        
      </Tab.Navigator>
        
    )


 


}





export default Chat

const styles = StyleSheet.create({
    container:{
        height:"100%",
    }
})
