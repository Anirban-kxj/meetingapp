import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props){
    
    if(props.contact_dur === '3low'){
        return (
            <View style={styles.lowcard}>
                <View style={styles.cardContent}>
                    { props.children }
                </View>
            </View>
        )
    }
    else if(props.contact_dur === '2medium'){
        return (
            <View style={styles.medcard}>
                <View style={styles.cardContent}>
                    { props.children }
                </View>
            </View>
        )
    }
    else if(props.contact_dur === '1high'){
        return (
            <View style={styles.highcard}>
                <View style={styles.cardContent}>
                    { props.children }
                </View>
            </View>
        )
    }
    else {
        return <View></View>
    }
    
}

const styles = StyleSheet.create({
    card:{
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
    lowcard:{
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#CFF8E9',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    medcard:{
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#F8F5CF',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    highcard:{
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#F8D3CF',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent:{
        marginHorizontal: 18,
        marginVertical: 10
    }
})