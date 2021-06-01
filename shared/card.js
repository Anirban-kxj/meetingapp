import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props){ 

    if(props.contact_dur === '3low'){
      return (
        <View style={styles.lowcard}>
          <View style={styles.lowUpperBox}>
            <Text style={styles.textName}>{props.event_name}</Text>
          </View>      
          <View style={styles.cardContent}>
            <View style={styles.leftText}>
              <View style={styles.leftTextDate}>
                <Text style={styles.textDate}>{props.date}</Text>
                <View style={styles.dateView}>
                  <Text style={styles.cardText}>{props.month}</Text>
                </View>
              </View>
              <View style={styles.leftTextTime}>
                <Text style={styles.cardText}>{props.time}</Text>
              </View>
            </View>
            <View style={styles.borderDesign}/>
            <View style={styles.rightText}>  
              <View style={styles.rightTextName}>        
                <Text style={styles.textName}>{props.user_name}</Text> 
              </View> 
              <Text style={styles.cardText}>{props.user_location}</Text>           
            </View>
          </View>    
      </View>
      )
  }
  else if(props.contact_dur === '2medium'){
      return (
        <View style={styles.medcard}>
        <View style={styles.medUpperBox}>
          <Text style={styles.textName}>{props.event_name}</Text>
        </View>      
        <View style={styles.cardContent}>
          <View style={styles.leftText}>
            <View style={styles.leftTextDate}>
              <Text style={styles.textDate}>{props.date}</Text>
              <View style={styles.dateView}>
                <Text style={styles.cardText}>{props.month}</Text>
              </View>
            </View>
            <View style={styles.leftTextTime}>
              <Text style={styles.cardText}>{props.time}</Text>
            </View>
          </View>
          <View style={styles.borderDesign}/>
          <View style={styles.rightText}>  
            <View style={styles.rightTextName}>        
              <Text style={styles.textName}>{props.user_name}</Text> 
            </View> 
            <Text style={styles.cardText}>{props.user_location}</Text>           
          </View>
        </View>    
      </View>
      )
  }
  else if(props.contact_dur === '1high'){
      return (
        <View style={styles.highcard}>
        <View style={styles.highUpperBox}>
          <Text style={styles.textName}>{props.event_name}</Text>
        </View>      
        <View style={styles.cardContent}>
          <View style={styles.leftText}>
            <View style={styles.leftTextDate}>
              <Text style={styles.textDate}>{props.date}</Text>
              <View style={styles.dateView}>
                <Text style={styles.cardText}>{props.month}</Text>
              </View>
            </View>
            <View style={styles.leftTextTime}>
              <Text style={styles.cardText}>{props.time}</Text>
            </View>
          </View>
          <View style={styles.borderDesign}/>
          <View style={styles.rightText}>  
            <View style={styles.rightTextName}>        
              <Text style={styles.textName}>{props.user_name}</Text> 
            </View> 
            <Text style={styles.cardText}>{props.user_location}</Text>           
          </View>
        </View>    
      </View>
      )
  }

}

const styles = StyleSheet.create({
  lowcard:{
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#DBF5D9',
      shadowOffset: {width: 1, height: 1},
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 10,
      marginVertical: 20,           
  },
  medcard:{
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#D2E7F3',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 20,           
},
highcard:{
  borderRadius: 6,
  elevation: 3,
  backgroundColor: '#F8EBEB',
  shadowOffset: {width: 1, height: 1},
  shadowColor: '#333',
  shadowOpacity: 0.3,
  shadowRadius: 2,
  marginHorizontal: 10,
  marginVertical: 20,           
},
  lowUpperBox:{      
      borderTopLeftRadius:6,
      borderTopRightRadius:6,     
      backgroundColor: '#A3F39C',
      alignItems:"center",          
      // paddingHorizontal: 120,  
      paddingVertical: 11,    
  },
  medUpperBox:{      
    borderTopLeftRadius:6,
    borderTopRightRadius:6,     
    backgroundColor: '#93CFF1',
    alignItems:"center",          
    // paddingHorizontal: 120,  
    paddingVertical: 11,    
},
highUpperBox:{      
  borderTopLeftRadius:6,
  borderTopRightRadius:6,     
  backgroundColor: '#F39C9C',
  alignItems:"center",          
  // paddingHorizontal: 120,  
  paddingVertical: 11,    
},
    cardContent:{
      //marginHorizontal: 30,
      paddingHorizontal:30,
      marginVertical: 10,   
      flexDirection: 'row',        
  },
    borderDesign:{
      flex:1,
      borderColor: 'black',
      borderLeftWidth: 1,
      paddingRight: 10,      
    },
    leftTextDate:{
      flexDirection: "row",  
         
    },
    leftTextTime:{
      marginVertical: 10
    },
    rightTextName:{
      alignItems:"center",
      marginBottom: '10%',
      // marginLeft: 20
    },
    leftText:{
      marginRight: 15
    },
    rightText:{
      alignItems:"center",
      paddingVertical:10,
      paddingRight: '15%'
      //  marginTop: 10,       
      //  marginRight: 15
    },
    textDate:{
      fontSize: 30,
      fontWeight:"bold"
    },
    textName:{
      fontSize: 20, 
      fontWeight:"bold"
    },
    cardText:{
      fontSize: 20,        
    },
    dateView:{
      marginHorizontal:10,
      marginTop: 10,
    },
});
