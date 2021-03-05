import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {auth,db} from '../firebase'
const freelancer = ({navigation}) => {
    const [freelancer,setFreelancer]=useState([]);
    useEffect(()=>{
        db.collection('freelancer')
        .onSnapshot(snapshot=>{
            setFreelancer(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })

    },[])
    console.log(freelancer)
    return (
       <SafeAreaView>
           <ScrollView>
           {freelancer?.map(freelancer=>{

            if(freelancer?.id!=auth.currentUser.uid){
              return( <View style={{height:220,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10}}>
              <View style={{height:40,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10,backgroundColor:"#2C6BED"}} >

              <Text style={{fontWeight:"500",fontSize:18,color:"white"}}>{freelancer.data.name} </Text>
              </View>
              <Text style={{marginLeft:9,fontWeight:"500",fontSize:15}}>{freelancer.data.title}</Text>
              <Text style={{marginLeft:9,marginTop:5}}>skills :</Text>
              <View style={{flex:1,padding:5,margin:2}}>
              <Text style={{marginLeft:2}} numberOfLines={5}>{freelancer.data.description}</Text>
              </View>
              
              <Text style={{marginLeft:9,marginTop:8}}>Experience:</Text>
              <Text style={{marginLeft:9,marginTop:5}}>Begineer</Text> 
              <TouchableOpacity onPress={()=>{console.log("test")}} >
              <Icon name="message-text-outline" size={35} 
              onPress={()=>{navigation.navigate('toChat',{id:freelancer?.id,toUser:freelancer?.data.name,tophotoURL:freelancer?.data.photoUrl,toemail:freelancer?.data.toemail})}}
               style={{position:"relative",marginLeft:300,margin:5,color:"#2C6BED"}}/>
              </TouchableOpacity>
          </View>
            
             


         )}
           })}
           </ScrollView>
          
       </SafeAreaView>
    )
}

export default freelancer

const styles = StyleSheet.create({
   freelancer:{
      
     flex:1,
     padding:8
   },

})

{/* <View style={styles.freelancer} key={freelancer?.id}>
                <View style={{height:20,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10}}>
                 <View style={{height:40,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10,backgroundColor:"#2C6BED"}} >
 
                 <Text style={{fontWeight:"500",fontSize:18,color:"white"}}>{freelancer.data.name} </Text>
                 </View>
                 <Text style={{marginLeft:9,fontWeight:"500",fontSize:15}}>{freelancer.data.title}</Text>
                 <Text style={{marginLeft:9,marginTop:5}}>skills :</Text>
                 <View style={{flex:1,padding:5,margin:2}}>
                 <Text style={{marginLeft:2}} numberOfLines={5}>{freelancer.data.description}</Text>
                 </View>
                 
                 <Text style={{marginLeft:9,marginTop:8}}>Experience:</Text>
                 <Text style={{marginLeft:9,marginTop:5}}>Begineer</Text> 
                 <TouchableOpacity onPress={()=>{console.log("test")}} >
                 <Icon name="message-text-outline" size={35} onPress={()=>{console.log("test")}} style={{position:"relative",marginLeft:300,margin:5,color:"#2C6BED"}}/>
                 </TouchableOpacity>
             </View>
               
                
 
 
            </View> */}