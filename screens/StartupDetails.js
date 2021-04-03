import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Image } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { ScrollView } from 'react-native-gesture-handler';

import {AntDesign,Ionicons,Entypo,MaterialIcons} from 'react-native-vector-icons';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { add } from 'react-native-reanimated';
import { auth, db } from '../firebase';
const StartupDetails = ({route,navigation}) => {
   const {details} = route.params;
   const [userstate,setUserstate] = useState(true);
   const [modalVisible, setModalVisible] = useState(false);
   const [Investments,setInvestments]=useState([]);
  const  [Present,setPresent]=useState(false);
    //console.log("details",details)
    console.log("investment",Investments)
    useEffect(()=>{
        if(auth.currentUser.uid!=details.data.userId){
            setUserstate(false);
        }

        
        
        
        
        
    })

    useEffect(()=>{
      const x =  Investments.find(startup=>startup.id===details.data.startUpId)
      if(x?.id===details.data.startUpId){
        setPresent(true)
        console.log("present",Present);

      }else{
        setPresent(false)
        console.log("present",Present);

      }
    })

    

    
    
    
    useEffect(()=>{
      const unsubscribe = db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('YourInvestments')
      .onSnapshot((snapshot)=>setInvestments(
          snapshot.docs.map(doc =>({
            id:doc.id
          }))
      ))

       return unsubscribe;
    },[])
    const add=()=>{
      setModalVisible(!modalVisible);
      db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('YourInvestments')
      .doc(details.data.startUpId)
      .set({
        description:details.data.description,
        displayName:details.data.displayName,
        logoUrl:details.data.logoUrl,
        photoURl:details.data.photoURl,
        sharePrice:details.data.sharePrice,
        startUpId:details.data.startUpId,
        title:details.data.title,
        userId:details.data.userId

      })
      
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:details.data.title,
            
            headerRight:()=>(
             
                <Pressable disabled={auth.currentUser.uid==details.data.userId?true:false}
                style={{margin:5}}
                onPress={() => setModalVisible(true)}
              >
                {!Present?<MaterialIcons name="library-add" size={28} style={{color:"white"}}/>:<AntDesign name="delete" size={28} style={{color:"white"}} />}
                
              </Pressable>
    
              
            )
        })
    })
    
    //{id:id,toUser:data.toUser,tophotoURL:data.tophotoURL,toemail:data.toemail}

    const remove=()=>{
      setModalVisible(!modalVisible);
      console.log("present from remove",Present);
      db.collection('users')
      .doc(auth.currentUser.uid)
      .collection('YourInvestments')
      .doc(details.data.startUpId)
      .delete().then({
        
      })

      
      
    }

    return (
        <View style={styles.StartupComponent} >
            
             <Image  style={{height:200,padding:50,margin:5}} source=
            {{uri:details.data.logoUrl}}/>
            
             <View style={styles.startupheader}>
                 <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:5}}>{details.data.title}</Text>
                 
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
            
            <Text style={{ fontWeight: 'bold',fontSize: 15,marginLeft:80,marginBottom:5}}> Share Price</Text>
            </View>
            
            </View>
            <Button style={{height:50,bottom:5}} title="Chat" disabled={userstate} onPress={()=>{navigation.navigate('toChat',{id:details.data.userId,toUser:details.data.displayName,tophotoURL:details.data.photoURl})}} />
            <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {!Present?
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Mark your InvestMent?</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={add}
          >
            <Text style={styles.textStyle}>Add</Text>
          </Pressable>
          <Pressable 
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>close</Text>
          </Pressable>
        </View>
      </View>
        :<View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Remove  your InvestMent?</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={remove}
          >
            <Text style={styles.textStyle}>remove</Text>
          </Pressable>
          <Pressable 
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>close</Text>
          </Pressable>
        </View>
      </View>}
        

      </Modal>
     
    </View>
            
            
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
    centeredView: {
        
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        
      },
      modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin:5
        
      },
      buttonOpen: {

        width:100
        
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        width:100
        
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
