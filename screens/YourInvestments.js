import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native'
import {auth,db} from '../firebase' 
import StartupComponent from './StartupComponent';
const YourInvestments = ({navigation}) => {
    const [StartupDetails,setStartupDetails] = useState([]);
    
    useEffect(()=>{
        const unsubscribe =  db.collection('users')
        .doc(auth.currentUser.uid)
        .collection('YourInvestments')
        .onSnapshot(snapshot=>{
            setStartupDetails(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })

        return unsubscribe;
    },[])

    return (
        <SafeAreaView>

            <ScrollView>
                {StartupDetails.map(data=>{
                    if(data.data.userId!=auth.currentUser.uid){
                        return(
                        <StartupComponent
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

export default YourInvestments

const styles = StyleSheet.create({})
