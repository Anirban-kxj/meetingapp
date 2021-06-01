import React, { useState } from 'react';
import { View, Text,Button, StyleSheet, Modal } from 'react-native';

import { fetchMeeting } from '../helpers/db';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';

const ShowMeetingDetailsScreen = props =>{  
    const [modalOpen, setModalOpen] = useState(false);  

    const event = props.navigation.getParam('event');       

    return(
        <View style={styles.screen}>
            {/* <Card>
                <Text>{ event.user_name }</Text>
                <Text>{ event.user_contact }</Text>
                <Text>{ event.user_event }</Text>
                <Text>{ event.user_comment }</Text>     
            </Card> */}



      <Modal visible={modalOpen}>
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModalOpen(false)}
          />          
        </View>
      </Modal>

            <Text>The ShowMeetingDetailsScreen Screen</Text>
            <Button title='Go To AniShowStats' 
                    onPress={()=>{
                        props.navigation.navigate({routeName: 'AniShowStats'});
                    }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ShowMeetingDetailsScreen;


// export default function ShowMeetingDetailsScreen({ route, navigation }) {

//     /* 2. Get the param */
//   const { event } = route.params;
//   const { name } = route.params;
//   const { contactno } = route.params;
//   const { comments } = route.params;

//   //insertEvent(event, name, contactno, comments );
//   const dbResult = fetchMeeting();
//   console.log('DB Result ShowMeetingDetailsScreen: '+dbResult);

//     return(
//         <View styles={globalStyles.container}>
//             <Card>
//                 <Text>{ event }</Text>
//                 <Text>{ name }</Text>
//                 <Text>{ contactno }</Text>
//                 <Text>{ comments }</Text>     
//             </Card>           
//         </View>
//     )
// }

