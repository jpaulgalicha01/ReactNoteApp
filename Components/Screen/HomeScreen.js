import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Styles from '../Styles/Styles'
import icons from '../Styles/icons'
import List from './List/list'
import db from '../../db_file/db'

const HomeScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  const [reload,setReload] = useState(false)

  useEffect(() =>{
    navigation.addListener('focus', async () => {
      await loadData()
    });
     loadData()
  },[reload])

  

  const loadData = async() =>{
    db.transaction((tx)=>{
      tx.executeSql(
        "SELECT * FROM tblNote ORDER BY id ASC",
        [],
       (sqlTxn, res)=>{
        let len = res.rows.length;
        if(len > 0 ){
          let result = [];

           for(let i = 0; i < len; i++){
            let row = res.rows.item(i);
            result.push({id:row.id, title: row.title})
           }

            setList(result)

        }else{
          console.log("No data Found")
        }
       },
       err => {
        console.log("ERROR: ",err.message)
       }
      )
    })
  }


  const scrollList = () =>{
    return(
      <View style={Styles.scrollList} />
    )
  }

  const editNote = async(id) =>{
      navigation.navigate("Edit");
  }

  const deleteNote = async(id) =>{
    Alert.alert("Confirmation", "Would you like to delete this?",[
      {
        text:"Yes",
        onPress: ()=> deleteItem(id),
        style:"default"
      },
      {
        text:"No",
        onPress: ()=> console.log("cancel"),
        style:"cancel"
      }
    ])
  }

  const handleReload = async() =>{
    await setList('')
    await setReload(true);
    setTimeout( async () => {
       await setReload(false)
    });
  }

  const deleteItem = async(id) =>{
    try {
      db.transaction(tx =>{
        tx.executeSql(
          "DELETE FROM tblNote WHERE id=?",
          [id.id],
          ()=>{
            Alert.alert("SUCCESS", "SUCCESSFULLY DELETE",[
              {
                text:"OK",
                onPress: () => handleReload(),
              }
            ])
          },
          err => (
            console.log("FAILED: ",err)
          )
        )
      })
    } catch (error) {
      console.log("ERROR: ",error.message)
    }
  }

  return (
    <View>
      {/* Header */}
      <Header title={{title:"Notes"}}/>

      {/* Content */}
      <View style={Styles.body}>
        
        <View style={Styles.content}>
            <TouchableOpacity style={[Styles.btnAdd,{alignSelf:"flex-end",
        flexDirection:"row",
        gap:5}]} onPress={() => navigation.navigate("Add")}>
              <Image
              source={icons.addIcon}
              style={{width:20,height:20,tintColor:"white",alignSelf:"center"}}
              />
              <Text style={[Styles.txtP,{fontSize:20}]}>Add</Text>
            </TouchableOpacity>

              <View style={{height:"85%"}}>
                  <FlatList
                  ItemSeparatorComponent={scrollList}
                  data={list}
                  keyExtractor={(item) =>item.id.toString()}
                  renderItem={({item}) =>(
                    <View style={{margin:10}}>
                      <List item={item} editNote={editNote} deleteNote={deleteNote}/>
                    </View>
                  )}
                  onRefresh={handleReload}
                  refreshing={reload}
                />
              </View>

        </View>
      </View>

    </View>
  )
}
export default HomeScreen
