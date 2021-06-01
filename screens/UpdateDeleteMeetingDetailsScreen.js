import React, {useState, useEffect} from 'react';
import {View,Text, Alert, TextInput, Platform, StyleSheet, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, MaterialIcons, Fontisto, AntDesign } from '@expo/vector-icons';
//import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import * as SQLite from 'expo-sqlite';
import { format } from "date-fns";
const db = SQLite.openDatabase('UserManagementDatabase.db');

//export default function MeetingDetailsFormScreen({ navigation }) {
const UpdateDeleteMeetingDetailsScreen = (props) => {
  console.log("Inside UpdateDeleteMeetingDetailsScreen Anirban: ",props.touchableUserName," :",props.touchableUserContact," :",props.touchableUserEvent," :",props.touchableUserComment," :",props.touchableUserVisitedPlace," :",props.touchableUserContactDuration," :",props.touchableNewDate," :",props.touchableMonth," :",props.touchableYear," :",props.touchableTime)

  const [userName, setUserName] = useState(props.touchableUserName);
  const [userContact, setUserContact] = useState(props.touchableUserContact);
  const [userEvent, setUserEvent] = useState(props.touchableUserEvent);
  const [userComment, setUserComment] = useState(props.touchableUserComment);     
  const [userVisitedPlace, setUserVisitedPlace] = useState(props.touchableUserVisitedPlace); 
  const [usercontactDuration, setUsercontactDuration] = useState(props.touchableUserContactDuration); 
  const [newDate, setNewDate] = useState(props.touchableNewDate);
  const [month, setMonth] = useState(props.touchableMonth);
  const [year, setYear] = useState(props.touchableYear);
  const [time, setTime] = useState(props.touchableTime);
  const userId = props.touchableUserId;  


  const [date, setDate] = useState(new Date(1598051730000));
//   const [newDate, setNewDate] = useState("");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fullDate, setFullDate] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [time, setTime] = useState("");
 

  //used for loading getEventDetails at the beginning of the screen load
  useEffect(() => {
    // write your code here, it's like componentWillMount
    getCurrentDateFormat();
    }, [])


    const getCurrentDateFormat = () => {
      // Creating variables to hold time.
      var todayTime;

      const myDate = new Date().toLocaleDateString();   

      //do the time calculation
      todayTime = new Date();
      // var currTime = today.getHours() + ":" + today.getMinutes();
      // console.log("Current time: ", currTime);

      setDateFormat(myDate); 
      setTimeFormat(todayTime); 
      //setShow(Platform.OS === 'ios'); 
    }

  const setDateFormat = (getDate)=>{
    console.log("Value of getDate: ",JSON.stringify(getDate));
    setDate(new Date(getDate));
    var getDate = JSON.stringify(getDate);    
    var mon;
    
    console.log("Value of getDate: ",getDate.replace(/"/g,"").split('/'))
    if(getDate.includes("/")){ 
      var v_month = getDate.replace(/"/g,"").split('/')[0];
      var v_date = getDate.replace(/"/g,"").split('/')[1];
      var v_year = getDate.replace(/"/g,"").split('/')[2];
      console.log("Month: ",v_month)
      console.log("Date: ",v_date)
      console.log("Year: ",v_year)

      //console.log("Value of fullDate************: ",v_year+"-"+v_month+"-"+v_date)
      setFullDate(v_year+"-"+v_month+"-"+v_date)
            
    }
    else{
      var v_month = getDate.substring(6,8);
      var v_date = getDate.substring(9,11);
      var v_year = getDate.substring(1,5);
      console.log("Month: ",v_month)
      console.log("Date: ",v_date)
      console.log("Year: ",v_year)    
      
      setFullDate(getDate.substring(1,11));
    }

    if(v_month==="01" || v_month==="1"){
      mon="JAN"
    }
    else if (v_month==="02" || v_month==="2"){
      mon="FEB"
    }
    else if (v_month==="03" || v_month==="3"){
      mon="MAR"
    }
    else if (v_month==="04" || v_month==="4"){
      mon="APR"
    }
    else if (v_month==="05" || v_month==="5"){
      mon="MAY"
    }
    else if (v_month==="06" || v_month==="6"){
      mon="JUN"
    }
    else if (v_month==="07" || v_month==="7"){
      mon="JUL"
    }
    else if (v_month==="08" || v_month==="8"){
      mon="AUG"
    }
    else if (v_month==="09" || v_month==="9"){
      mon="SEP"
    }
    else if (v_month==="10"){
      mon="OCT"
    }
    else if (v_month==="11"){
      mon="NOV"
    }
    else if (v_month==="12"){
      mon="DEC"
    }
    console.log("Value of mon: ",mon);
    
    setNewDate(v_date);      
    setMonth(mon);
    setYear(v_year);    
  }


  const setTimeFormat = (todayTime)=>{
    console.log("Time is: ", typeof(todayTime));
    var TimeType, hour, minutes, fullTime;
    // Getting current hour from Date object.
    hour = todayTime.getHours(); 

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if(hour <= 11)
    { 
      TimeType = 'AM'; 
    }
    else{ 
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM'; 
    }  

    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if( hour > 12 )
    {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format. 
    if( hour == 0 )
    {
        hour = 12;
    } 


    // Getting the current minutes from date object.
    minutes = todayTime.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }

    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    console.log("Full time: ",fullTime)
    setTime(fullTime);
  }

  const onChange = (event, selectedDate) => {
    console.log("Selected date: "+selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if(mode==="date"){
      setDateFormat(currentDate);
    }
    else if(mode==="time"){
      setTimeFormat(currentDate)
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    console.log("Setting show mode ",currentMode);
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
        'UPDATE user_table set user_name=?, user_contact=? , user_event=?, user_visited_place=?, user_comment=?, user_contact_duration=?, date=?, month=?, year=?, time=?, dateFormat=? where user_id=?',
        [userName, userContact, userEvent, userVisitedPlace, userComment, usercontactDuration, newDate, month, year, time, fullDate, userId],
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

  return (
    <View style={styles.container}>
      {/* <View>        
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Ionicons 
          name="calendar" 
          size={24} 
          color="black" 
          onPress={showDatepicker}
        />
      </View>       */}
      {/* <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
        <MaterialCommunityIcons 
          name="clock-time-four" 
          size={24} 
          color="black" 
          onPress={showTimepicker}
        />
      </View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}          
        />
      )}

      <View style={styles.upperSection}>
        <View style={styles.dateAndTime}>
          <View>
            <View style={styles.dateFormat}>
              <Text style={{fontSize:22, fontWeight:"bold", color:"#489468", paddingRight:4}}>{newDate}</Text>
              <Text style={{fontSize:22, fontWeight:"bold", paddingRight:4}}>{month}</Text>
              {/* <Ionicons 
                name="md-calendar" 
                //name={$Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
                size={24} 
                color="black" 
                onPress={showDatepicker}
              /> */}
              <AntDesign 
                name="calendar" 
                size={24} 
                color="black" 
                onPress={showDatepicker}
            />
            </View>        
            <Text style={{fontSize:20, paddingLeft:30}}>{year}</Text>
          </View>         
        
        
          <View style={styles.timeFormat}>
            <Text style={{fontSize:22, fontWeight:"bold", color:"#489468", paddingRight:4}}>{time}</Text>
            {/* <MaterialCommunityIcons 
              name="md-clock-time-four" 
              size={24} 
              color="black" 
              onPress={showTimepicker}
            /> */}
            <AntDesign 
                name="clockcircleo" 
                size={24} 
                color="black" 
                onPress={showTimepicker}
            />
          </View>
        </View>
      </View>

      <View style={styles.horizontalLine}/>
      <View>
        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Name:
          </Text>
          <TextInput
            placeholder="Name of the person you met Anirban"
            onChangeText={(userName) => setUserName(userName)}
            style={styles.textInputStyle}
            placeholderTextColor="grey" 
            value={userName}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Contact Number:
          </Text>
          <TextInput
            placeholder="Contact Number of the person you met"
            onChangeText={(userContact) => setUserContact(userContact)}
            maxLength={10}
            keyboardType="numeric"
            style={styles.textInputStyle}
            placeholderTextColor="grey" 
            value={userContact.toString()}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Location:
          </Text>
          <TextInput
            placeholder="Location of the Event"
            onChangeText={(userVisitedPlace) => setUserVisitedPlace(userVisitedPlace)}
            style={styles.textInputStyle}
            placeholderTextColor="grey" 
            value={userVisitedPlace}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Event:
          </Text>
          <TextInput
            placeholder="Name of the event"
            onChangeText={(userEvent) => setUserEvent(userEvent)}
            style={styles.textInputStyle}
            placeholderTextColor="grey" 
            value={userEvent}
          />
        </View>

        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Comment:
          </Text>
          <TextInput
            placeholder="Any comments for the event"
            onChangeText={(userComment) => setUserComment(userComment)}
            style={styles.textInputStyle}
            placeholderTextColor="grey" 
            maxLength={225}
            //numberOfLines={5}
            multiline={true}
            value={userComment}
          />
        </View>
        
        <View style={styles.textInput}>
          <Text style={styles.textStyle}>
            Level:
          </Text>
          <View >
            <DropDownPicker 
              items={[
                  {label: 'High', value: '1high'},
                  {label: 'Medium', value: '2medium'},
                  {label: 'Low', value: '3low'}
              ]}
              placeholder="High, Med, Low"
              placeholderStyle={{color:"grey", fontSize:16}}
              containerStyle={{height: 30, width: 180, marginLeft:5}}
              style={{backgroundColor: '#fafafa', borderColor: "black", borderWidth: 0, height: 40, width: "95%", padding: 10}}
              itemStyle={{
                  justifyContent: 'flex-start',                      
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onOpen={()=>{Keyboard.dismiss()}}
              onChangeItem={handleContactDuration} 
              defaultValue={usercontactDuration} 
              //onPress={Keyboard.dismiss()}                 
            /> 
          </View>  
        </View>
                
      </View>

      {/* <View style={styles.saveIcon}>
        <Fontisto 
          name="save" 
          size={28} 
          color="#327FF3" 
          onPress={props.addEventDetails.bind(this, userName, userContact, userEvent, userVisitedPlace, userComment, usercontactDuration, newDate, month, year, time)} 
        />
      </View> */}
      {/* <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}><Button color='maroon' title="Update" onPress={updateEventHandler} /></View>
        <View style={styles.buttonStyle}><Button color='maroon' title="Delete" onPress={deleteEventHandler} /></View>
      </View> */}

      <View style={styles.saveIcon}>
        <Fontisto 
          name="save" 
          size={28} 
          color="#327FF3" 
          onPress={updateEventHandler} 
        />


        <MaterialIcons 
         name="delete" 
         size={28} 
         color="black" 
         onPress={deleteEventHandler}
        />     
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'skyblue',
    justifyContent: 'flex-start',
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  dateFormat:{
    //flex:1,
    flexDirection:"row",
     
  },
  timeFormat:{
    //flex:1,
    flexDirection:"row",
    marginLeft:40
  },
  dateAndTime:{
    //flex:1,
    flexDirection:"row",
    justifyContent:"space-between", 
    
  },
  upperSection:{
    //flex:0.20,
    marginTop: 50, 
    
  },
  horizontalLine:{
    borderBottomColor: 'black',
    borderBottomWidth: 0.7,  
    marginBottom:40
  },
  textInputStyle : {
    fontSize:18,
    marginLeft: 10,
    marginBottom: 20
    // padding: 10, 
    // borderColor: "black", 
    // borderWidth:1, 
    // height: 40, 
    // width: "95%", 
    // marginBottom: 20
  },
  textInput:{
    flexDirection:'row'
  },
  saveIcon:{
    flexDirection:"row-reverse",
    justifyContent:"space-between",
    marginTop:50
  },
});

export default UpdateDeleteMeetingDetailsScreen;