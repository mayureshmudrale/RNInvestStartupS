import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import {auth,db} from '../firebase'
import 'react-native-get-random-values';
import { v4 as uuidv4, v4 } from 'uuid';
const SelectContact = ({navigation}) => {
    const [users,setuser] = useState([]);
    console.log("users",users)
    useEffect(()=>{
        db.collection('users')
        .onSnapshot(snapshot=>{
            setuser(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
    },[])
   

    const createChat= async(toId,toName,photoURl,email)=>{
        
        await db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('chats')
        .doc(toId)
        .set({

            toUser:toName,
            tophotoURL:photoURl,
            email:email,


        }).then(async ()=>{
            await db.collection('users')
            .doc(toId)
            .collection('chats')
            .doc(auth.currentUser.uid)
            .set({
                toUser:auth.currentUser.displayName,
                tophotoURL:auth.currentUser.photoURL,
                email:auth.currentUser.email,
            })
        }).then(
            navigation.navigate('toChat',{id:toId,toUser:toName,tophotoURL:photoURl,toemail:email})
        )

        
    }


    return (
        <View style={styles.container}>
            {users.map(data=>{
                if(data.id!=auth.currentUser.uid){
                    return(
                            
                            <TouchableOpacity style={styles.postheader}  key={data.id} activeOpacity={0.5} onPress={()=>{createChat(data?.id,data?.data.displayName,data?.data.photoURL,data?.data.email)}}>
                               <Avatar.Image  
                                 rounded
                                 source={{uri:data?.data?.photoURL}} 

                                style={{ margin:10}}
                                size={50}

                               
                                 
                              />
                              <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:15}}>{data.data.displayName}</Text>
                            </TouchableOpacity>
                             
                        
                                
                    
                    )
                }
                
            })}
            
        </View>
    )
}

export default SelectContact

const styles = StyleSheet.create({
    container:{
        flex:1

    },
    postheader:{
        
        flexDirection:'row',
        alignItems:"center",
        backgroundColor:'#f7f7f7',
        borderColor:'lightgray',
        marginTop:2,
        height:60,
        padding:5
        
      
      },
      
      
})
