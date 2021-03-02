import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'

import { Button, Input } from 'react-native-elements'
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity } from 'react-native'

import { useState } from 'react'
import { ScrollView } from 'react-native';
import StartupComponent from './StartupComponent';
import {auth,db} from '../firebase'
import 'react-native-get-random-values';
import { v4 as uuidv4, v4 } from 'uuid';
import { KeyboardAvoidingView } from 'react-native';
const {Value} =Animated
const Startup = ({navigation}) => {
  
const  bs = React.createRef();
const fall = new Animated.Value(1);
const [title, setTitle] = useState();
const[description,setDescription]=useState("");
const [sharePrice,setSharePrice]=useState("");
const[ImageUrl,setImageURl]=useState("");
const user = auth.currentUser.uid
const [fieldstate,setfieldState]=useState(true)
const [StartupDetails,setStartupDetails] = useState([]);
const ref = db.collection('users')

useEffect(()=>{
  if(title && description && sharePrice){
    setfieldState(false)
  }
})

useEffect(()=>{
   

    ref.doc(user)
    .collection('Startup')
    .onSnapshot(snapshot=>{
      setStartupDetails(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
    

   


},[])

  async function Add(){
  



  bs.current.snapTo(0)
  setfieldState(true)
  const uid = uuidv4()
  await ref.doc(user)
  .collection('Startup')
  .doc(uid)
  .set({
    startUpId:uid,
    userId:user,
    title:title,
    description:description,
    sharePrice:sharePrice,
    logoUrl:ImageUrl  || "https://previews.123rf.com/images/popaukropa/popaukropa1702/popaukropa170200672/71870912-start-up-logo-startup-emblem-running-business-getting-case-red-up-arrow.jpg",
    displayName:auth.currentUser.displayName,
    photoURl:auth.currentUser.photoURL,

  }).then(
    await db.collection('Startup')
    .doc(uid)
    .set({
      startUpId:uid,
      userId:user,
      title:title,
      description:description,
      sharePrice:sharePrice,
      logoUrl:ImageUrl  || "https://previews.123rf.com/images/popaukropa/popaukropa1702/popaukropa170200672/71870912-start-up-logo-startup-emblem-running-business-getting-case-red-up-arrow.jpg",
      displayName:auth.currentUser.displayName,
      photoURl:auth.currentUser.photoURL,


  
    })
  )

  

  setTitle("")
  setDescription("")
  setSharePrice("")
  setImageURl("")
  
}
  const renderInner =()=>(
    
    <View style={styles.panel}>
    <View style={{alignItems: 'center'}}>

    
      
    </View>
    <Input  style={styles.InputFields}  placeholder="Startup Title"  value={title} selectTextOnFocus={true}  onChangeText={(text)=>setTitle(text)}></Input>
    <Input  style={{borderColor: 'gray' ,margin:7 }}   placeholder="Describe Your startup" multiline={true} value={description}   onChangeText={(text)=>setDescription(text)} ></Input>
    <Input  style={styles.InputFields}  selectTextOnFocus={true} placeholder="Share Price" value={sharePrice}   onChangeText={(text)=>setSharePrice(text)}></Input>
    <Input  style={styles.InputFields}  selectTextOnFocus={true}  multiline={true} placeholder="Image Url(optional)" value={ImageUrl}  onChangeText={(text)=>setImageURl(text)} ></Input>
    
   
    <TouchableOpacity style={styles.panelButton} disabled={fieldstate} onPressOut={Add} >
      <Text style={styles.panelButtonTitle}>ADD</Text>
    </TouchableOpacity> 
    
    
  </View>
  
  )

  const renderHeader =()=>(
    <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
      <Text style={styles.panelSubtitle}>Swipe Down to Close</Text>
    </View>
  </View>
  );

  return (
    <>
    <View
              style={{
                flex: 1,
                
                flexDirection:'column'
                ,backgroundColor:'#e6e3e3',
                margin:5
                
              }}
          >
            <Button
              title="Add Your StartUp"
              
              onPress={() => bs.current.snapTo(50)
            
              }
            />
            {/* <View style={styles.Yourstartup}>
              <Text style={{ fontWeight: '100',fontSize: 15}}>Your StartUp</Text>
            </View> */}

            <ScrollView>
              {StartupDetails?.map(startup=>{
                return(<StartupComponent 
                  key={startup.data.startUpId}
                  details={startup}
                    //startupid={startup.startUpId}
                  //  userId={startup?.userId} 
                     navigation={navigation}
                  //   logoUrl={startup.ImageUrl}
                  //   sharePrice={startup.sharePrice}
                  //   description={startup.description}
                  //   title={startup.title}
                    
                    />)
              })}
             
              
                
            </ScrollView>
            

          </View>
          <BottomSheet
        ref={bs}
        snapPoints={[0,465]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={0}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  )
}

export default Startup

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Yourstartup:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#f7f7f7',
    
    marginTop:2,
    height:50,
},
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  image:{
    height:300,width:350,alignItems:"center",margin:5,padding:10,
    backgroundColor:'lightgray',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#403d38',
    alignItems: 'center',
    margin: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop:  -12,
    paddingLeft: 10,
    color: '#05375a',
     height: 20, width: 100
  },
  // InputFields:{
  //   height: 50, borderColor: 'gray', borderWidth: 1 ,margin:7 ,borderRadius:1
  // }
})
