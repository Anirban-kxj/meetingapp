import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import Color from '../constants/Color';
import { globalStyles } from '../styles/global';

import * as SQLite from 'expo-sqlite';
import FirstTimeScreen from './FirstTimeScreen';
import EnterMeetingDetailsScreen from './EnterMeetingDetailsScreen';
const db = SQLite.openDatabase('UserManagementDatabase.db');

const HomeScreen = (props) =>{
  //console.log("Value of  props Home Screen: ",props);

    const [userNumber, setUserNumber] = useState();
    const [eventDetail, setEventDetail] = useState([]);
    

   useEffect(() => {       
      db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='user_table'",
            [],
            function (txn, res) {
              console.log('************* item:', res.rows.length);
              if (res.rows.length == 0) {                 
                txn.executeSql('DROP TABLE IF EXISTS user_table', []);  
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS user_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_event VARCHAR(100), user_visited_place VARCHAR(100), user_comment VARCHAR(255), user_contact_duration VARCHAR(8), date VARCHAR(8), month VARCHAR(10), year VARCHAR(8), time VARCHAR(8), dateFormat VARCHAR(50))',
                  []
                );
                //txn.executeSql('commit;', []);                  
              }
            }
          );
        });
      }, []);

      //db code for showing the items inserted - fetching the values from DB
      useEffect(() => { 
        try {
            db.transaction((tx) => {
              
            tx.executeSql('SELECT * FROM user_table', [], (tx, results) => {
              //tx.executeSql("pragma table_info('user_table')", [], (tx, results) => {                
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i){
                  temp.push(results.rows.item(i));
                  //console.log("********Value of the query: ",results.rows.item(i))
                }                
                console.log("Value of results.rows.length: ", results.rows.length)
                setUserNumber(results.rows.length)
                setEventDetail(temp);
            });
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

      let content = <View style={styles.screen}>
                      <FirstTimeScreen />
                      <View style={styles.buttonStyle}>
                        {/* <Button title='Click Me' 
                                      onPress={()=>{
                                          //props.navigation.navigate({routeName: 'AniEnterMeeting'});
                                          props.navigation.navigate(EnterMeetingDetailsScreen)
                                      }}/> */}
                      </View>
                    </View>
      
      //commenting the check to show the first time screen
      // if(userNumber>0){
      //     content = <EnterMeetingDetailsScreen eventDetail={eventDetail}/>
      // }

    return(
        <View style={styles.screen}>
            {content}
        </View>
            
        
        
    );
};

// HomeScreen.navigationOptions = {
//     headerTitle: 'Home',
//     // headerStyle: {
//     //     backgroundColor: Platform.OS === 'android' ? Color.primaryColor : 'white'
//     // },
//     // headerTintColor: Platform.OS === 'android'? 'white' : Color.primaryColor
// }

const styles = StyleSheet.create({
    screen :{
        flex: 1,
         justifyContent: 'center',
        // alignItems: 'center'
    },
    buttonStyle:{
        justifyContent: 'center',
        width:'60%',
        alignSelf: "center"
       // margin:80
    }
 
});

export default HomeScreen;