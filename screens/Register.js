import React, { useLayoutEffect, useState } from 'react'
import { StatusBar, ToastAndroid } from 'react-native'
import { Alert } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth,db } from '../firebase'

const Register = ({navigation}) => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(""); 
    const [imageUrl,setimageUrl] = useState("");
    
    useLayoutEffect(()=>{
        navigation.setOptions({

        });
    },[navigation]);

const doSignUp = () => {
        if (!email) {
          
            ToastAndroid.show("email required", ToastAndroid.SHORT);
          
          
          return
        } else if (!password && password.trim() && password.length > 6) {
          ToastAndroid.show("weak password", ToastAndroid.SHORT);
          return
        }
    
        doCreateUser(email, password)
      }

      const doCreateUser = async (email, password) => {
        try {
          let response = await auth.createUserWithEmailAndPassword(
            email,
            password,
          )
          if (response && response.user) {
            Alert.alert("Success ✅", "Account created successfully")
            auth.signInWithEmailAndPassword(email,password)
            const user = auth.currentUser;
            user.updateProfile({
              displayName:name,
              photoURL:imageUrl || "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg",
            }).then(()=>{
              db.collection('users')
              .doc(user.uid)
              .set({
                displayName:name,
                photoURL:imageUrl ||"https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg",
                id:user.uid,
                email:user.email
              })
              
            })
           
            

          
          
            
            
          }
        } catch (e) {
          ToastAndroid.show(e.message, ToastAndroid.SHORT);
          console.error(e.message)
        }
      }

const register=()=>{
    console.log(email)
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
        authUser.user.updateProfile({
            displayName:name,
            photoURL:imageUrl || "https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg",
        })
    })

}

    return (
       <KeyboardAvoidingView style={styles.container}>
           <StatusBar style="light" />
           <Text h3 style={{marginTop:100,}}>create Account</Text>
           <View style={styles.inputContainer}>

                <Input placeholder="Full Name " autoFocus  type="text"   onChangeText={(text)=>setName(text)}/>
                <Input placeholder="Email"   type="email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password"   secureTextEntry type="password" value={password} onChangeText={(text)=>setPassword(text)}  />
                <Input placeholder="Image url (optional)"   type="text" value={imageUrl}  onChangeText={(text)=>setimageUrl(text)} onSubmitEditing={doSignUp}/>
                
                
           </View>

           <Button containerStyle={styles.button} onPress={doSignUp} type="outline"  title="Register"/>
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
        marginBottom:5,
    },
    button:{
        width:200,
        marginTop:2,
        padding:10
    },
})
