import React, { useState } from 'react';
import { Button, TextInput, View, Alert, Keyboard, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SQLite from 'expo-sqlite';
import { format } from "date-fns";

//var db = openDatabase({ name: 'UserDatabase.db' });
const db = SQLite.openDatabase('UserManagementDatabase.db');

const UpdateDeleteMeetingDetailsScreenOld = (props) => {
  console.log("Inside UpdateDeleteMeetingDetailsScreen ")
  console.log("username, usercontact, userevent, usercomment, userid : ", props.touchableUserName, props.touchableUserContact, props.touchableUserEvent, props.touchableUserVisitedPlace, props.touchableUserEnteredDateTime, props.touchableUserComment, props.touchableUserContactDuration, props.touchableUserId)
  const [userName, setUserName] = useState(props.touchableUserName);
  const [userContact, setUserContact] = useState(props.touchableUserContact);
  const [userEvent, setUserEvent] = useState(props.touchableUserEvent);
  const [userVisitedPlace, setUserVisitedPlace] = useState(props.touchableUserVisitedPlace);
  const [userEnteredDate, setUserEnteredDate] = useState(props.touchableUserEnteredDateTime);
  const [userComment, setUserComment] = useState(props.touchableUserComment);  
  const [usercontactDuration, setUsercontactDuration] = useState(props.touchableUserContactDuration);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const userId = props.touchableUserId;  

  const showDatePicker = () => {   
    Keyboard.dismiss();   
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    //console.log("A date has been picked: ", date.toString());
    var fdate = new Date(date);    
    var formattedDate = format(fdate, "yyyy-MM-dd HH:mm:ss");  
    console.log("Formatted date: ",formattedDate);
    setUserEnteredDate(formattedDate);
    
    hideDatePicker();
  };

  const handleContactDuration =(item) => {
    Keyboard.dismiss();
    console.log("User contact duration: ",item.value);
    setUsercontactDuration(item.value)    
  }

  const updateEventHandler = () => {
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userEvent) {
      alert('Please fill Event Name');
      return;
    }
    if (!userComment) {
        alert('Please fill Comment');
        return;
    }

    //update database
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user_table set user_name=?, user_contact=? , user_event=?, user_visited_place=?, user_entered_date_time=?, user_comment=?, user_contact_duration=? where user_id=?',
        [userName, userContact, userEvent, userVisitedPlace, userEnteredDate, userComment, usercontactDuration, userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: props.updateDeleteModal.bind(this, false),
                },
              ],
              // { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    }); 
  }  
  
  const deleteEventHandler = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM user_table where user_id=?',
        [userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Record deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: props.updateDeleteModal.bind(this, false),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Deletion Failed');
          }
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "update sqlite_sequence set seq = 0 where name='user_table' ",
        [],
        (tx, results) => {
          console.log('Results*****', results.rowsAffected);          
        }
      );
    });

  }

    return(    
    <View style={styles.screen}>
        <TextInput
                placeholder="Enter Name"                
                onChangeText={(text) => setUserName(text)}
                //onChangeText={setNameHandler}                
                style={styles.textInputStyle}
                value={userName}
                // defaultValue={initialname}
              />
              <TextInput
                placeholder="Enter Contact No"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={styles.textInputStyle}
                value={userContact.toString()}
              />
              <TextInput
                placeholder="Enter Event Name"
                onChangeText={(userEvent) => setUserEvent(userEvent)}                
                style={styles.textInputStyle}
                value={userEvent}
              />

              <TextInput
                placeholder="Enter Place Visited"
                onChangeText={(userVisitedPlace) => setUserVisitedPlace(userVisitedPlace)}                
                style={styles.textInputStyle}
                placeholderTextColor="maroon" 
                value={userVisitedPlace}
              />             
              <View>                                              
                <TextInput 
                  placeholder="Enter Date and Time" 
                  onFocus={showDatePicker} 
                  style={styles.textInputStyle}
                  placeholderTextColor="maroon" 
                  //value={userEnteredDate}
                  showSoftInputOnFocus={false}>{ userEnteredDate }</TextInput> 
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>                                        

              <TextInput
                placeholder="Enter Comment"
                onChangeText={(userComment) => setUserComment(userComment)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10, borderColor: "black", borderWidth:1, width: "95%", marginBottom: 20 }}
                value={userComment}
              />
              <View style={{marginBottom:120}}>
                <DropDownPicker
                    items={[
                        {label: 'High', value: '1high'},
                        {label: 'Medium', value: '2medium'},
                        {label: 'Low', value: '3low'}
                    ]}
                    placeholder="Enter Contact Duration"
                    placeholderStyle={{color:"maroon"}}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa', borderColor: "black", borderWidth: 1, height: 40, width: "95%", padding: 10,}}
                    itemStyle={{
                        justifyContent: 'flex-start',                      
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={handleContactDuration} 
                    onOpen={()=>{Keyboard.dismiss()}}                    
                    defaultValue={usercontactDuration}                
                /> 
              </View>
              
              <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}><Button color='maroon' title="Update" onPress={updateEventHandler} /></View>
                <View style={styles.buttonStyle}><Button color='maroon' title="Delete" onPress={deleteEventHandler} /></View>
              </View>
    </View>             
             
    )
};

const styles = StyleSheet.create({ 
  screen: {
    padding: 10,
    flex: 1,
    //alignItems: "center",
  }, 
  textInputStyle : {
    padding: 10, 
    borderColor: "black", 
    borderWidth:1, 
    height: 40, 
    width: "95%", 
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonStyle:{
      width:80,
  }
});

export default UpdateDeleteMeetingDetailsScreenOld;