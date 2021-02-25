import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { auth } from '../firebase';
const StartupDetails = ({route,navigation}) => {
   const {details} = route.params;
   const [userstate,setUserstate] = useState(true);
    console.log("details",details)
    useEffect(()=>{
        if(auth.currentUser.uid!=details.data.userId){
            setUserstate(false);
        }
    })
  
    //{id:id,toUser:data.toUser,tophotoURL:data.tophotoURL,toemail:data.toemail}
    return (
        <View style={styles.StartupComponent} >
             <Image  style={{height:200,padding:50,margin:5}} source=
            {{uri:details.data.logoUrl}}/>
            
             <View style={styles.startupheader}>
                 <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:5}}>Tesla</Text>
                 
             </View>
             <View style={{flex:1,padding:5,margin:2}}>
                    <Text>
                    {details.data.description}
                    </Text>
                   
    
                    
            </View>
            
            <View style={{flex:1,flexDirection:"row",marginTop:2,marginLeft:2}}>
           
            <View style={{marginLeft:150,marginTop:5,padding:10}}> 
            <View style={{flex:1,height:50,width:20,marginTop:60,marginLeft:75}}>
                <Icon name="currency-inr"  size={18}/>
            </View>
            <Text style={{marginLeft:95}}>{details.data.sharePrice}</Text>
            
            <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:80}}> Share Price</Text>
            </View>
            
            </View>
            <Button style={{height:50,}} title="Chat" disabled={userstate} onPress={()=>{navigation.navigate('toChat',{id:details.data.userId,toUser:details.data.displayName,tophotoURL:details.data.photoURL})}} />
            
            
            
         </View>
    )
}

export default StartupDetails

const styles = StyleSheet.create({
    container:{
      
        backgroundColor:"#f7f7f7",
        height:400,
        width:500,
        flexDirection:"column"
    },
    StartupComponent:{
        flex:1,
        height:240,
        backgroundColor:"#f7f7f7",
        margin:4,
        padding:2,
    },
    startupheader:{
        height:40,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        borderBottomColor:'lightgray',
        borderBottomWidth:1,
        
        

        
    },
})
