import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native'
import StartupComponent from './StartupComponent'
import {auth,db} from '../firebase' 
import { TextInput } from 'react-native';
import {AntDesign,Ionicons} from 'react-native-vector-icons';
import { KeyboardAvoidingView } from 'react-native';
const InvestFeed = ({navigation}) => {
const [StartupDetails,setStartupDetails] = useState([]);
const [textInput,setTextInput] = useState('');
const [details,setdetails]=useState([]);
console.log("details",details)
useEffect(()=>{
    const unsubscribe= db.collection('Startup')
    .onSnapshot(snapshot=>{
        setStartupDetails(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        })))
    })
    console.log("Startupdet",StartupDetails)
    
    console.log("details",details)
    return unsubscribe;

    
},[])
const Search=()=>{
    
    

    return(
        <View style={styles.footer}>
                           
        <TextInput placeholder="message" value={textInput} autoFocus={true} onChangeText={(text)=>setTextInput(text)} style={styles.TextInput}/>
        <TouchableOpacity activeOpacity={0.5}  >

           
        </TouchableOpacity>
       </View>
    )
       
    
}

// const SearchInput=(textInput)=>{
    
//     //setdetails(StartupDetails.filter(i=>i.data.title.toLowerCase().includes(textInput)))
    
//     this.setState({
//         details:StartupDetails
//     })

// }

// useEffect(()=>{
//     const unsubscribe= db.collection('Startup')
//     .onSnapshot(snapshot=>{
//         setStartupDetails(snapshot.docs.map(doc=>({
//             id:doc.id,
//             data:doc.data()
//         })))
//     })
//     console.log("Startupdet",StartupDetails)
    
//     console.log("details",details)
//     return unsubscribe;

    
// },[])


    return (
       
        <SafeAreaView>
             <KeyboardAvoidingView>
            <ScrollView  stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} >
            
            <Search/>
                

                {StartupDetails.map(data=>{
                    if(data.data.userId!=auth.currentUser.uid && data.data.title.toLowerCase().includes(textInput.toLowerCase())){
                        return(
                        <StartupComponent
                        key={data?.data.startUpId}

                        details={data}
                        navigation={navigation}
                        
                        />)
                    }
                })}
             
           
            </ScrollView>
            </KeyboardAvoidingView>
       </SafeAreaView>
       
    )

    


}





export default InvestFeed

const styles = StyleSheet.create({
    feed:{
        height:250,
        backgroundColor:"#f7f7f7",
        margin:2,
        padding:2,
        
    },
    postheader:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        borderColor:'lightgray',
        marginTop:2,
        height:100,

    },
    TextInput:{
        
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,
      
    },
    footer:{
        
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:8
       

         
     
        
    },


})
