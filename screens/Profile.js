import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { Avatar } from 'react-native-paper'
import { auth } from '../firebase'

const Profile = ({navigation}) => {
    const signout=()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        });
        
    }
    
    return (
        <View style={{flex:1}}>
            <View style={{height:150,backgroundColor:"#2C6BED" ,alignItems:"center",borderBottomColor:'lightgrey',borderBottomWidth:2}}>
                <Avatar.Image size={100} source={{uri:auth.currentUser.photoURL}} style={{margin:10}}  />
                <Text style={{color:"white"}}> {auth.currentUser.displayName}</Text>
            </View>
            <View>

            </View>

            <Button title="Logout" onPress={signout} style={{bottom:0,padding:10,margin:5,borderRadius:10}}/>
            
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})
