import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import Color from '../constants/Color';

const FirstTimeScreen = props => {
   
    return(
        <View style={styles.screen}>
            <View>
                <Text style={styles.txt}>Your Private Contact Tracing Journal</Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/pic1.jpg')}
                        style={styles.image}
                    />
                </View> 
                <View style={styles.paraContainer}>
                    <Text style={styles.txt}>Congratulations! You have taken the first step to track your meetings in an orgainised and precise manner.</Text>  
                    <Text style={styles.txt}>We haven't detected any places visited by you yet. Bluetooth signals of the devices that are in close proximity, and around which you have spend considerable amount of time will be detected.</Text>  
                    <Text style={styles.txt}>You can manually add a meeting details using the round button in the lower right of this screen.</Text>  
                </View>                             
            </View>
            {/* <Text>The First Time Screen</Text> */}
            {/* <Button title='Go To AniEnterMeeting' 
                    onPress={()=>{
                        props.navigation.navigate({routeName: 'AniEnterMeeting'});
                    }}/> */}
        </View>
    );
};

// FirstTimeScreen.navigationOptions = {
//     headerTitle: 'Home',
//     // headerStyle: {
//     //     backgroundColor: Platform.OS === 'android' ? Color.primaryColor : 'white'
//     // },
//     // headerTintColor: Platform.OS === 'android'? 'white' : Color.primaryColor
// }

const styles = StyleSheet.create({
    txt: {
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 20
    },
    screen: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    imageContainer:{
        width: 300,
        height: 300, 
        alignSelf: "center"   
        //flex: 1,  
    },
    image:{
        width: '100%',
        height: '100%',
        resizeMode: "contain",     
        
    },
    paraContainer:{
        //flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    }
})

export default FirstTimeScreen;