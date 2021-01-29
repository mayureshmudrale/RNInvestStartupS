import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({navigation}) => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [imageUrl,setimageUrl] = useState("");
    
    useLayoutEffect(()=>{
        navigation.setOptions({

        });
    },[navigation]);


const register=()=>{
    auth.createUserWithEmailAndPassword(email,password)

}

    return (
       <KeyboardAvoidingView style={styles.container}>
           <StatusBar style="light" />
           <Text h3 style={{marginBottom:50,}}>create Account</Text>
           <View style={styles.inputContainer}>

                <Input placeholder="Full Name " autoFocus  type="text" value={name}  onChange={(text)=>setName(text)}/>
                <Input placeholder="Email"   type="email" value={email}  onChange={(text)=>setEmail(text)}/>
                <Input placeholder="Password"   secureTextEntry type="password" value={password} onChange={(text)=>setPassword(text)}  />
                <Input placeholder="Image url (optional)"   type="text" value={imageUrl}  onChange={(text)=>setimageUrl(text)} onSubmitEditing={register}/>
                
                
           </View>

           <Button containerStyle={styles.button} onPress={register} type="outline"  title="Register"/>
           <View style={{height:100}}></View>
       </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white",
       
      },
    inputContainer:{
        width:300,
        
    },
    button:{
        width:200,
        marginTop:10,
        padding:10
    },
})
