import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native'
import StartupComponent from './StartupComponent'
import {auth,db} from '../firebase' 



const InvestFeed = ({navigation}) => {

const [StartupDetails,setStartupDetails] = useState([]);

useEffect(()=>{
    db.collection('Startup')
    .onSnapshot(snapshot=>{
        setStartupDetails(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        })))
    })
},[])
console.log(StartupDetails)
    return (
        <SafeAreaView>
            <ScrollView>
                {StartupDetails.map(data=>{
                    if(data.data.userId!=auth.currentUser.uid){
                        return(<StartupComponent
                        key={data?.data.startUpId}

                        details={data}
                        navigation={navigation}
                        
                        />)
                    }
                })}
             
           
            </ScrollView>
           
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

    }


})
