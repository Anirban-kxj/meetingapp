import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from "react-native";

import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';

import MeetingDetailsFormScreen from './MeetingDetailsFormScreen';
import UpdateDeleteMeetingDetailsScreen from './UpdateDeleteMeetingDetailsScreen';
//import { insertMeeting } from '../helpers/db';

import * as SQLite from 'expo-sqlite';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { TextInput } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
//import { filter } from 'lodash.filter';
 

//var db = openDatabase({ name: 'UserDatabase.db' });
const db = SQLite.openDatabase('UserManagementDatabase.db');

const EnterMeetingDetailsScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [touchableModalUserId, setTouchableModalUserId] = useState('');
  const [touchableModalUserName, setTouchableModalUserName] = useState('');
  const [touchableModalUserContact, setTouchableModalUserContact] = useState('');
  const [touchableModalUserEvent, setTouchableModalUserEvent] = useState('');
  const [touchableModalUserVistedPlace, setTouchableModalUserVistedPlace] = useState('');
  //const [touchableModalUserEnteredDateTime, setTouchableModalUserEnteredDateTime] = useState('');
  const [touchableModalUserComment, setTouchableModalUserComment] = useState('');
  const [touchableModalUserContactDuration, setTouchableModalUserContactDuration] = useState('');

  const [touchableModalNewDate, setTouchableModalNewDate] = useState('');
  const [touchableModalMonth, setTouchableModalMonth] = useState('');
  const [touchableModalYear, setTouchableModalYear] = useState('');
  const [touchableModalTime, setTouchableModalTime] = useState('');

  const [sortEventDetails, setSortEventDetails] = useState('');
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [arrayholder, setArrayholder] = useState([]);

  //used for loading getEventDetails at the beginning of the screen load
  useEffect(() => {
    // write your code here, it's like componentWillMount
    getEventDetails();
    }, [])

  

  const methodSetSortModalOpen = (val) => {
    setSortModalOpen(false);
    console.log("Value passed: "+val)
    if (val === 'latest_entry'){
      setSortEventDetails('');
    }
    else{
      setSortEventDetails(val);
    }    
  }
  
  const getEventDetails = () => {
    //db code for showing the items inserted - fetching the values from DB
    try {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM user_table', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
              console.log("Value of temp: ", temp)
              setEventDetails(temp); 
              setArrayholder(temp);        
            
          });
        });   
    } catch (error) {
      console.log(error);
    }
  }

  // const getSortedEventDetails = () => {
  //   console.log("********** Inside the getSortedEventDetails ****************")
  //   //db code for fetching sorted items from DB
  //   try {      
  //       db.transaction((tx) => {
  //         tx.executeSql('SELECT * FROM user_table order by user_contact_duration', [], (tx, results) => {
  //           var temp = [];
  //           for (let i = 0; i < results.rows.length; ++i)
  //             temp.push(results.rows.item(i));
  //             console.log("Value of temp: ", temp)
  //             setEventDetails(temp);         
            
  //         });
  //       });   
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  
  const addEventDetails = (name,contact, event, visitedPlace, comment, contactDuration, date, month, year, time, dateFormat) => {
      console.log('Name: ',name);
      console.log('date: ',date," month: ",month," year: ",year," time: ",time, " dateFormat: ",dateFormat); 

      if (!contactDuration) {
        alert('Please enter the level of contact');
        return;
      }
      
      try {
        db.transaction(function(tx) {                  
          tx.executeSql(
            'INSERT INTO user_table (user_name, user_contact, user_event, user_visited_place, user_comment, user_contact_duration, date, month, year, time, dateFormat) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [name, contact, event, visitedPlace, comment, contactDuration, date, month, year, time, dateFormat],
            //"SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            //[],
            (tx, results) => {              
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You are Registered Successfully',
                  // [
                  //   {
                  //     text: 'Ok',
                  //     onPress: () => navigation.navigate('HomeScreen'),
                  //   },
                  // ],
                  // { cancelable: false }
                )
              }else {
                alert('Registration Failed');
              }
            }
          )
        }
        )
      } catch (error) {
        console.log(error);
      }
      setModalOpen(false);
      getEventDetails();
      
  }

  const updateDeleteModalHandler = (modalOpenValue) =>{    
    setModalOpen(modalOpenValue);
    setTouchableModalUserId('');
    getEventDetails();
  }

  
  
  const touchableModalHandler = (item) =>{
    console.log("*************Id: ", item.date, " : ",item.month," : ",item.year," : ",item.time)
    setTouchableModalUserId(item.user_id)
    setTouchableModalUserName(item.user_name);
    setTouchableModalUserContact(item.user_contact);
    setTouchableModalUserEvent(item.user_event);
    setTouchableModalUserVistedPlace(item.user_visited_place);
    //setTouchableModalUserEnteredDateTime(item.user_entered_date_time);
    setTouchableModalUserComment(item.user_comment);    
    setTouchableModalUserContactDuration(item.user_contact_duration);  
    
    setTouchableModalNewDate(item.date);
    setTouchableModalMonth(item.month);
    setTouchableModalYear(item.year);
    setTouchableModalTime(item.time);


    setModalOpen(true)      
    //{updDelMeetScreen}
    // props.navigation.navigate({
    //       routeName: 'AniUpdateDeleteMeeting',
    //       params: {
    //           item: item
    //       }
    //     })
  
  }

  

  let updDelMeetScreen = <View></View>
  if(touchableModalUserId){    
    console.log("Inside if block")
      updDelMeetScreen = 
      <Modal visible={modalOpen}>  
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
           // onPress={() => setModalOpen(false)}
           onPress={() => updateDeleteModalHandler(false)}           
          />                              
          <UpdateDeleteMeetingDetailsScreen 
            touchableUserId={touchableModalUserId} 
            touchableUserName={touchableModalUserName} 
            touchableUserContact={touchableModalUserContact} 
            touchableUserEvent={touchableModalUserEvent} 
            touchableUserVisitedPlace={touchableModalUserVistedPlace}
            //touchableUserEnteredDateTime={touchableModalUserEnteredDateTime}
            touchableUserComment={touchableModalUserComment} 
            touchableUserContactDuration={touchableModalUserContactDuration}
            touchableNewDate={touchableModalNewDate}
            touchableMonth={touchableModalMonth}
            touchableYear={touchableModalYear}
            touchableTime={touchableModalTime}
            updateDeleteModal={updateDeleteModalHandler}
          /> 
        </View>
      </Modal>
      //setTouchableModalUserId('');
  }

  let displayMeetingDetails = <View></View>
  if(sortEventDetails && touchableModalUserId.length===0){     
    console.log("Inside the if part of displayMeetingDetails: "+sortEventDetails);
    //getSortedEventDetails();

        // if (sortEventDetails === "user_entered_date_time"){  
        //   displayMeetingDetails = 
        //   <FlatList
        //         keyExtractor={(item, index) => index.toString()}
        //         data={eventDetails.sort((a, b) => new Date(a.user_entered_date_time).getTime() < new Date(b.user_entered_date_time).getTime())}
                  
        //         renderItem={({ item }) => (
        //           <TouchableOpacity
        //             //onPress={() => navigation.navigate("AniShowMeeting", item)}
        //             // onPress={() => props.navigation.navigate({
        //             //     routeName: 'AniShowMeeting',
        //             //     params: {
        //             //         event: item
        //             //     }
        //             // })}
        //             onPress={() => touchableModalHandler(item)}                         
        //           > 
                  
        //           <Card
        //             contact_dur={item.user_contact_duration}
        //             >              
        //               {/* <Text style={globalStyles.titleText}>{item.user_id}</Text> */}
        //               <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Name:   </Text>{item.user_name}</Text>
        //               {/* <Text style={globalStyles.titleText}>{item.user_contact}</Text> */}
        //               <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Event Name:   </Text>{item.user_event}</Text>
        //               <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Location:   </Text>{item.user_visited_place}</Text>
        //               <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Date:   </Text>{item.user_entered_date_time}</Text>
        //               {/* <Text style={globalStyles.titleText}>{item.user_comment}</Text>
        //               <Text style={globalStyles.titleText}>{item.user_contact_duration}</Text> */}
        //             </Card>            
        //           </TouchableOpacity>
        //         )}
        //       /> 
        // }
        if(sortEventDetails === "user_name"){

          displayMeetingDetails = 
          <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={eventDetails.sort((a, b) => a.user_name.localeCompare(b.user_name))}  
                  
                renderItem={({ item }) => (
                  <TouchableOpacity              
                    onPress={() => touchableModalHandler(item)}                         
                  > 
                  
                  <Card
                    contact_dur={item.user_contact_duration}
                    > 
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Name:   </Text>{item.user_name}</Text>              
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Event Name:   </Text>{item.user_event}</Text>
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Location:   </Text>{item.user_visited_place}</Text>
                      {/* <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Date:   </Text>{item.user_entered_date_time}</Text>                 */}
                    </Card>            
                  </TouchableOpacity>
                )}
              /> 
              
        }
        else if (sortEventDetails === "user_contact_duration"){
          displayMeetingDetails = 
          <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={eventDetails.sort((a, b) => a.user_contact_duration.localeCompare(b.user_contact_duration))}  
                  
                renderItem={({ item }) => (
                  <TouchableOpacity              
                    onPress={() => touchableModalHandler(item)}                         
                  > 
                  
                  <Card
                    contact_dur={item.user_contact_duration}
                    > 
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Name:   </Text>{item.user_name}</Text>              
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Event Name:   </Text>{item.user_event}</Text>
                      <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Location:   </Text>{item.user_visited_place}</Text>
                      {/* <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Date:   </Text>{item.user_entered_date_time}</Text>                 */}
                    </Card>            
                  </TouchableOpacity>
                )}
              /> 
        }
        setSortEventDetails('');       
      }
      else if(touchableModalUserId.length===0){
        console.log("Inside the else part of displayMeetingDetails");
        displayMeetingDetails = 
        <FlatList
          keyExtractor={(item, index) => index.toString()}  
          //data={eventDetails.sort((a, b) => a.sortEventDetails.localeCompare(b.sortEventDetails))}        
          data={eventDetails}
          renderItem={({ item }) => (
            <TouchableOpacity
              //onPress={() => navigation.navigate("AniShowMeeting", item)}
              // onPress={() => props.navigation.navigate({
              //     routeName: 'AniShowMeeting',
              //     params: {
              //         event: item
              //     }
              // })}
              onPress={() => touchableModalHandler(item)}            
            > 
              <Card
              contact_dur={item.user_contact_duration}
              event_name={item.user_event}
              date={item.date}
              month={item.month}
              time={item.time}
              user_name={item.user_name}
              user_location={item.user_visited_place}
              >              
                {/* <Text style={globalStyles.titleText}>{item.user_id}</Text> 
                <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Name:   </Text>{item.user_name}</Text>
                <Text style={globalStyles.titleText}>{item.user_contact}</Text>
                <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Event Name:   </Text>{item.user_event}</Text>
                <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Location:   </Text>{item.user_visited_place}</Text>
                <Text style={globalStyles.titleText}><Text style={styles.cardDetails}>Date:   </Text>{item.user_entered_date_time}</Text> 
                <Text style={globalStyles.titleText}>{item.user_comment}</Text>
                <Text style={globalStyles.titleText}>{item.user_contact_duration}</Text>*/}
              </Card>           
            </TouchableOpacity>
          )}
        />
      }
  

  const filterItem = (text) => {
    const newData = arrayholder.filter(item => {
      const nameData = item.user_name.toUpperCase();
      const placeData = item.user_visited_place.toUpperCase();
      const textData = text.toUpperCase();
      return (nameData.indexOf(textData) > -1 || placeData.indexOf(textData) > -1);
    });

    setEventDetails(newData);
    setSearchQuery(text);
 
    // this.setState({
    //   data: newData,
    //   text: text
    //   })
    }




  return (
    
    <View style={globalStyles.container}>

      <View style={styles.icons}>
        <MaterialIcons
          name="add"
          size={24}
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)}
        />

        <TextInput 
          placeholder="Enter Text..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(queryString) => filterItem(queryString)}
          // onChangeText={(text) => this.searchData(text)}
          // value={this.state.text}
          style={styles.searchInput}
        />

        {/* <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          //onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          //value={this.state.value}
      /> */}

        <MaterialIcons
          name="sort"
          size={24}
          style={styles.sortIconStyle}
          onPress={() => setSortModalOpen(true)}        
        />
      </View>      
      
      <Modal visible={sortModalOpen}>
        <View style={styles.modalView}>
          <View style={styles.sortOptions}>
            <TouchableOpacity onPress={()=>methodSetSortModalOpen('user_name')} style={styles.sortOptionsContent}>
              <Text>Name</Text>
            </TouchableOpacity>
          </View>
          
          {/* <View style={styles.sortOptions}>
            <TouchableOpacity onPress={()=>methodSetSortModalOpen('user_entered_date_time')} style={styles.sortOptionsContent}>
              <Text>Date</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.sortOptions}>
            <TouchableOpacity onPress={()=>methodSetSortModalOpen('user_contact_duration')} style={styles.sortOptionsContent}>
              <Text>Contact Duration</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sortOptions}>
            <TouchableOpacity onPress={()=>methodSetSortModalOpen('latest_entry')} style={styles.sortOptionsContent}>
              <Text>Latest Entry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalOpen}>
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModalOpen(false)}
          />
          <MeetingDetailsFormScreen addEventDetails={addEventDetails} />
        </View>
      </Modal>

    <View>{displayMeetingDetails}</View>

    {/* <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={eventDetails}
        renderItem={({ item }) => (
          <TouchableOpacity
            //onPress={() => navigation.navigate("AniShowMeeting", item)}
            // onPress={() => props.navigation.navigate({
            //     routeName: 'AniShowMeeting',
            //     params: {
            //         event: item
            //     }
            // })}
            onPress={() => touchableModalHandler(item)}            
          > 
            <Card>              
              <Text style={globalStyles.titleText}>{item.user_id}</Text>
              <Text style={globalStyles.titleText}>{item.user_name}</Text>
              <Text style={globalStyles.titleText}>{item.user_contact}</Text>
              <Text style={globalStyles.titleText}>{item.user_event}</Text>
              <Text style={globalStyles.titleText}>{item.user_visited_place}</Text>
              <Text style={globalStyles.titleText}>{item.user_entered_date_time}</Text>
              <Text style={globalStyles.titleText}>{item.user_comment}</Text>
              <Text style={globalStyles.titleText}>{item.user_contact_duration}</Text>
            </Card>            
          </TouchableOpacity>
        )}
      /> */}
      
       
      <View>
        {updDelMeetScreen}  
      </View>  

      {/* <Text>The EnterMeetingDetailsScreen Screen</Text>
      <Button
        title="Go To AniShowMeeting"
        onPress={() => {
          props.navigation.navigate("AniShowMeeting");
        }}
      />   */}
    </View>
  );
};


EnterMeetingDetailsScreen.navigationOptions = {
  headerTitle: 'Meeting Entries List'  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 15,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
},
sortIconStyle: {
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#f2f2f2',
  padding: 10,
  borderRadius: 10,
  alignSelf: "flex-end"
},
modalClose: {
    marginTop: 20,
    marginBottom: 0,
},
modalContent: {
  flex: 1,
},
modalView: {
  margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
icons:{
  flexDirection:"row",
  justifyContent:"space-between",
  
},
cardDetails: {
  fontWeight: "bold",
  color:"black"
},
sortOptions:{
  borderRadius: 6,
  elevation: 3,
  backgroundColor: '#fff',
  shadowOffset: {width: 1, height: 1},
  shadowColor: '#333',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginHorizontal: 4,
  marginVertical: 6
},
sortOptionsContent:{
  marginHorizontal: 18,
  marginVertical: 10
},
searchInput: {
  height: 45,
  width: '75%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 5,
  paddingLeft: 10
}
});

export default EnterMeetingDetailsScreen;
