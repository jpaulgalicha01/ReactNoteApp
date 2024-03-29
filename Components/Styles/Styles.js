import { StyleSheet } from "react-native";
import Theme_Color from "./Colors";


const Styles = StyleSheet.create({


    Header:{
        padding:20,
        backgroundColor:Theme_Color.primary,
        flexDirection:"column",
    },
    Header_Font:{
        fontSize:30,
        color : Theme_Color.white,
        fontFamily: "OpenSans-Bold"
    },

    body:{
        backgroundColor: Theme_Color.white,
        height:"90%",
        
    },
    content:{
        flex:1,
        padding:20,
        flexDirection:"column",
        gap:30,
    },
    scrollList:{
       height:10
    },
    box:{
        padding:20,
        borderRadius:15,
        backgroundColor: Theme_Color.white,
        elevation: 5,
        shadowColor: Theme_Color.secondary,
        shadowOpacity:.50,
    },
    




    
    // Text

    txtP :{
        color: Theme_Color.white,   
        fontFamily:"OpenSans-Regular"
    },

    // Button
    btnAdd:{
        backgroundColor: Theme_Color.primary,
        padding:10,
        borderRadius:100,
    },
    textInput:{
        borderBottomWidth:1,
        borderColor:Theme_Color.white,
        color:Theme_Color.secondary,
        paddingHorizontal:20,
        fontFamily:"OpenSans-Bold",
    },
    txtInputArea:{
        borderBottomWidth:1,
        borderColor:Theme_Color.white,
        color:Theme_Color.secondary,
        paddingHorizontal:20,
        fontFamily:"OpenSans-Regular",
        maxHeight:"50%"
    }
})

export default Styles