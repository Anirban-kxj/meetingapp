import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';


import * as SQLite from 'expo-sqlite';
import { format } from "date-fns";
const db = SQLite.openDatabase('UserManagementDatabase.db');

//export default function MeetingDetailsFormScreen({ navigation }) {
const MeetingDetailsFormScreen = (props) => {
  console.log("Inside MeetingDetailsFormScreen")

  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userEvent, setUserEvent] = useState('');
  const [userComment, setUserComment] = useState(''); 
  const [userEnteredDate, setUserEnteredDate] = useState('');   
  const [userVisitedPlace, setUserVisitedPlace] = useState(''); 
  const [usercontactDuration, setUsercontactDuration] = useState(''); 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // const addTextInput = (key) => {
  //   // let textInput = this.state.textInput;
  //   // textInput.push(<TextInput key={key} />);
  //   // this.setState({ textInput })
  //   //userName.push(<TextInput key={key}/>)
  //   //https://stackoverflow.com/questions/45407581/how-to-dynamically-add-a-text-input-in-react-native/45407976
  //   //https://reactnativeforyou.com/how-to-add-or-remove-textinput-dynamically-and-get-values-in-react-native/
  //   let userInputName = <TextInput key={key}/>
  //   setUserName((currentUserName) => [...currentUserName, userInputName]);
  // }

  const showDatePicker = () => {  
    Keyboard.dismiss();  
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {    
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date.toString());
    //console.log("Formatted date: ",Date.parse(date.toString()));
    var fdate = new Date(date);
    //var formattedDate = format(fdate, "MM-dd-yyyy HH:mm");
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


  let register_user = () => {
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

  };

    return(
    
    <View>
        <TextInput
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={styles.textInputStyle}
                placeholderTextColor="maroon"                
              />
              {/* <View>
                <Button title='+' onPress={() => addTextInput(userName.length)} />
                {userName.map((value, index) => {
                  return value
                })}
              </View> */}
              <TextInput
                placeholder="Enter Contact No"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={styles.textInputStyle}
                placeholderTextColor="maroon" 
              />
              <TextInput
                placeholder="Enter Event Name"
                onChangeText={(userEvent) => setUserEvent(userEvent)}                
                style={styles.textInputStyle}
                placeholderTextColor="maroon" 
              />  
              <TextInput
                placeholder="Enter Place Visited"
                onChangeText={(userVisitedPlace) => setUserVisitedPlace(userVisitedPlace)}                
                style={styles.textInputStyle}
                placeholderTextColor="maroon" 
              />             
              <View>                                              
                <TextInput 
                  placeholder="Enter Date and Time" 
                  onFocus={showDatePicker} 
                  style={styles.textInputStyle}
                  placeholderTextColor="maroon" 
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
                placeholderTextColor="maroon" 
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
                    style={{backgroundColor: '#fafafa', borderColor: "black", borderWidth: 1, height: 40, width: "95%", padding: 10}}
                    itemStyle={{
                        justifyContent: 'flex-start',                      
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onOpen={()=>{Keyboard.dismiss()}}
                    onChangeItem={handleContactDuration} 
                    //onPress={Keyboard.dismiss()}                 
                /> 
              </View>           
              
              
              <Button 
                color='maroon' 
                title="Submit" 
                onPress={props.addEventDetails.bind(this, userName, userContact, userEvent, userVisitedPlace, userEnteredDate, userComment, usercontactDuration)} 
                style={styles.buttonStyle}
              /> 
    </View>              
              
    )
}

const styles = StyleSheet.create({
  textInputStyle : {
    padding: 10, 
    borderColor: "black", 
    borderWidth:1, 
    height: 40, 
    width: "95%", 
    marginBottom: 20
  },
  buttonStyle : {
    marginTop:50,
  }
})

export default MeetingDetailsFormScreen;