import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Styles from '../Styles/Styles'
import Theme_Color from '../Styles/Colors'
import db from '../../db_file/db'


const AddNoteScreen = ({navigation}) => {


  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  const [onfocused, setFocused] = useState();
  const [onfocused1, setFocused1] = useState();




useEffect(()=>{
    try {
      create_table();
    } catch (error) {
      console.log("ERROR: ",error)
    }
},[]);

const save = async() =>{
  // Checking if null data
  if(title == null || title == ""){
    Alert.alert("Notice","Please Complete The Transaction",[
      {
        text:"ok",
        onPress: () => setFocused(true),
      }
    ])
  }
  else if(content == null || content == ""){
    Alert.alert("Notice","Please Complete The Transaction",[
      {
        text:"ok",
        onPress: () => setFocused1(true),
       
      }
    ])
  }
  else{
    try {
      await db.transaction(tx =>{
        tx.executeSql(
          'INSERT INTO tblNote (title, content) VALUES(?,?)',
          [title,content],
          ()=>{
            Alert.alert("Alert","Successfully Save Data",[
              {
                text:"ok",
                onPress: () => navigation.navigate("Home")
              }
            ])
          },
          err=>{
            console.log("ERROR: ",err)
          }
        )
      })
    } catch (error) {
      console.log("ERROR: ",error)
    }
  }
}


  const create_table = async() => {
        await db.transaction(tx =>{
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tblNote (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(250) , content VARCHAR(250))`,
            [],
            ()=>{
              console.log("Succesfully Created Tables")
            },
            err => {
              console.log("ERROR: ",err)
            }
          )
        })
  }

  return (
      <View>
        <Header title={{title: "Add Notes"}}/>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={Styles.body}>
              <View style={Styles.content} >

              <TextInput 
              style={[Styles.textInput, onfocused && {borderColor:Theme_Color.dark_grey}, !onfocused && {borderColor:Theme_Color.white}]} 
              // style={[styles.TextInput, nameFocused && { borderColor: 'blue' }, !nameFocused && { borderColor: 'gray' }]}
              onFocus={()=>setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder='Add Title' 
              placeholderTextColor={"#000"}
              textContentType='jobTitle'
              onChangeText={setTitle}
              value={title} 
              />
              
              <TextInput 
              style={[Styles.txtInputArea, onfocused1 && {borderColor:Theme_Color.dark_grey}, !onfocused1 && {borderColor:Theme_Color.white}]} 
              numberOfLines={5}
              onFocus={()=>setFocused1(true)}
              onBlur={() => setFocused1(false)}
              multiline 
              placeholder='Content'
              placeholderTextColor={"#000"}
              onChangeText={setContent}
              value={content}

              />
              <TouchableOpacity style={Styles.btnAdd} onPress={save}>
                <Text style={[Styles.txtP,{fontSize:20,textAlign:"center"}]}>Save</Text>
              </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>
    </View>
  )
}

export default AddNoteScreen