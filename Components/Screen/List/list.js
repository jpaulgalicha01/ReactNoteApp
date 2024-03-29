import {Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Styles from '../../Styles/Styles'


const List = ({item,editNote,deleteNote}) => {
  return (
      <TouchableOpacity key={item.id} onPress={()=>editNote(item)} onLongPress={()=>deleteNote(item)}>
          <View style={Styles.box} >
              <Text style={{color:"black"}}>{item.title}</Text>
          </View>
      </TouchableOpacity>
  )
}

export default List