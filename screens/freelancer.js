import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'


const freelancer = () => {
    return (
       <SafeAreaView>
           <View style={styles.freelancer}>
               <View style={{height:200,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10}}>
                <View style={{height:40,borderBottomColor:"lightgrey",borderBottomWidth:1,padding:10}} >
                    
                <Text style={{fontWeight:"500",fontSize:18}}>Mayuresh Mudrale </Text>
                </View>
                <Text style={{marginLeft:9,fontWeight:"200",fontSize:15}}>Software Developer</Text>
                <Text style={{marginLeft:9,marginTop:5}}>skills</Text>
               </View>
               


           </View>
       </SafeAreaView>
    )
}

export default freelancer

const styles = StyleSheet.create({
   freelancer:{
       flex:1,
      
   },

})
