import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { Avatar } from 'react-native-paper'
import { auth,db } from '../firebase'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler'

const Profile = ({navigation}) => {
    const [userDetail,setuserDetail]=useState();

    useEffect(()=>{
       db.collection('users')
       .doc(auth.currentUser.uid)
       .get()
       .then(snapshot=>{
           setuserDetail(snapshot.data())
       })
    
    },[])

   

    const signout=()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        });
        
    }
    
    return (
        <View style={{flex:1}}>
            <ScrollView>
            <View style={{height:200,backgroundColor:"#2C6BED" ,alignItems:"center",borderBottomColor:'lightgrey',borderBottomWidth:1}}>
                <Avatar.Image size={150} source={{uri:auth.currentUser.photoURL}} style={{marginTop:100,borderWidth:1,borderColor:"white",marginBottom:10}}  />
                <Text style={{color:"black",fontSize:20,fontWeight:"200"}}>{auth.currentUser.displayName}</Text>
            </View>
            
            <View style={{maxHeight:150,borderBottomColor:"lightgrey",borderBottomWidth:1,flex:1,flexDirection:"row"}}>
                <Icon name="mail-open" size={26} style={{marginTop:100,marginLeft:10}}/>
                <Text style={{marginLeft:10,fontWeight:"200",fontSize:20,marginTop:100}}>{auth.currentUser.email}</Text>
            </View>

            {userDetail?.freelancer?<View></View>: <View style=
            {{padding:10}}>
            <TouchableOpacity style={{alignContent:"center",alignItems:"center",backgroundColor:"#2C6BED",height:40,margin:1}} onPress={()=>{navigation.navigate('AddFreelance')}}>
                <Text style={{marginTop:9,color:"white"}}>want to be a Freelancer?</Text>
            </TouchableOpacity></View>}
            {/*  */}
            {/* <View style={{height:250,borderBottomColor:"lightgrey",borderBottomWidth:1,}}>
             </View> */}


             
          
            </ScrollView>
           

            <View style={{padding:10}}>
            <TouchableOpacity style={{alignContent:"center",alignItems:"center",backgroundColor:"#2C6BED",height:40,margin:1}} onPress={()=>{navigation.navigate('AddFreelance')}}>
                <Text style={{marginTop:9,color:"white"}}>Logout</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
