import { Text, View } from 'react-native'
import React from 'react'
import Styles from '../../Styles/Styles'

const Header = ({title}) => {
  return (
    <View style={Styles.Header}>
      <Text style={Styles.Header_Font}>{title.title}</Text>
    </View>
  )
}

export default Header

