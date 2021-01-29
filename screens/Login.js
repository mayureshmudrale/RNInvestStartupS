import { setStatusBarStyle } from 'expo-status-bar'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const signIn=()=>{

    }
    return (
      <KeyboardAvoidingView style={styles.container}>
          <View>    
              <StatusBar style="light"/>
              <Image source={{
                  uri:"https://ucarecdn.com/00aafc83-8bf7-48dd-bd5c-2f5f7ef44dbc/",

              }} style={{width:200,height:195}}/>
              <View style={styles.inputContainer}>
                  <Input placeholder="Email" autoFocus  type="email" value={email}  onChange={(text)=>setEmail(text)}/>
                  <Input placeholder="Password"  autoFocus secureTextEntry type="password"  value={password} onChange={(text)=>setPassword(text)}/>
              </View>
              <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
              <Button containerStyle={styles.button} onPress={()=>navigation.navigate("Register")} type="outline"  title="Register"/>
              
          </View>
         <View style={{height:100}}></View>

      </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white",
      },
      inputContainer:{
     
      },
      button:{
          padding:10
      },


})
