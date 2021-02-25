import React, { useState } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const StartupComponent = ({navigation,details}) => {
    
    
   
    return (
        
        <>
      
     <TouchableOpacity style={styles.StartupComponent} onPress={() => {
        navigation.navigate('StartupDetails',{details:details});
        }}>
        
         <View style={styles.startupheader}>
             <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:5}}>{details.data.title}</Text>
             
         </View>
         <View style={{flex:1,padding:5,margin:2}}>
                <Text>
                {details.data.description}
                </Text>
               

                
        </View>
        
        <View style={{flex:1,flexDirection:"row",marginTop:2,marginLeft:2}}>
        <Image  style={{height:60,width:60,padding:10,margin:5}} source=
        {{uri:details.data.logoUrl}}/>
        <View style={{marginLeft:150,marginTop:5,padding:10}}> 
        <View style={{flex:1,height:50,width:20,marginTop:25,marginLeft:10}}>
            <Icon name="currency-inr"  size={18}/>
        </View>
        <Text style={{marginLeft:30}}>{details.data.sharePrice}</Text>
        
        <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:10}}> Share Price</Text>
        </View>
        
     
        </View>

        
        
        
     </TouchableOpacity>
     </>
    )
}


export default StartupComponent;
const styles = StyleSheet.create({
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
