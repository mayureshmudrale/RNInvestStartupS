import React, { useLayoutEffect, useState } from 'react'
import {  ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth,db  } from '../firebase'
const AddFreelance = ({navigation}) => {
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    useLayoutEffect(()=>{
       navigation.setOptions({
           title:"Add your details ",
       })
    });
  const  addFreelancer=()=>{
        setTitle('');
        setDescription('');
        db.collection('freelancer')
        .doc(auth.currentUser.uid)
        .set({
            id:auth.currentUser.uid,
            name:auth.currentUser.displayName,
            photoUrl:auth.currentUser.photoURL,
            email:auth.currentUser.email,
            title:title,
            description:description
        })
        navigation.goBack();
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{flex:1,margin:5,padding:8,borderBottomColor:"lightgrey",borderBottomWidth:1}}>
                <Text style={{textAlign:"left",marginLeft:9}}>Enter a single sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)</Text>
                <Input placeholder="Title" value={title} onChangeText={(text)=>setTitle(text)} style={{alignSelf:"flex-start",borderWidth:1,flex:1,width:500,marginTop:5,borderRadius:5}} />
                </View>
                <KeyboardAvoidingView>
                <View style={{flex:1,margin:5,padding:8}}>
                    <Text style={{textAlign:"left",marginLeft:9}} >
                    Use this space to show clients you have the skills and experience they're looking for.
                    Describe your strengths and skills
                    Highlight projects, accomplishments and education
                    Keep it short and make sure it's error-free
                    </Text>
                    
                <Input placeholder="" style={{alignSelf:"flex-start",borderWidth:1,flex:1,width:500,marginTop:5,borderRadius:5}} value={description} onChangeText={(text)=>setDescription(text)} multiline={true} />
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly",bottom:10}}>
                <View style={{padding:20,height:80,width:120}}>
                <Button title="Cancel" onPress={()=>navigation.goBack()} buttonStyle={{backgroundColor:"#DE2250"}} />
                </View>
                <View style={{padding:20,height:80,width:120}}>
                <Button title="save" onPress={addFreelancer} buttonStyle={{backgroundColor:"#329B13"}} />
                </View>
                </View>
                </KeyboardAvoidingView>
            
               
            </ScrollView>
        
      
         
            

          
        </SafeAreaView>
    )
}

export default AddFreelance

const styles = StyleSheet.create({})
