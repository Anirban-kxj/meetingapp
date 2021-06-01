import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReportBarChart from '../components/ReportBarChart';

import * as SQLite from 'expo-sqlite';

//var db = openDatabase({ name: 'UserDatabase.db' });
const db = SQLite.openDatabase('UserManagementDatabase.db');

const ShowStatScreen = props =>{

    const [ lowStats, setLowStats] = useState(0);
    const [ mediumStats, setMediumStats] = useState(0);
    const [ highStats, setHighStats] = useState(0);

    //state to capture last 14 days result
    const [ lowStatsTwoWeeks, setLowStatsTwoWeeks] = useState(0);
    const [ mediumStatsTwoWeeks, setMediumStatsTwoWeeks] = useState(0);
    const [ highStatsTwoWeeks, setHighStatsTwoWeeks] = useState(0);

    //used for loading getEventDetails at the beginning of the screen load
    useEffect(() => {
        // write your code here, it's like componentWillMount
        statsEventHandler(); 
        //lastTwoWeeksData();        
        }, [])

    useEffect(() => {
        // write your code here, it's like componentWillMount
        lastTwoWeeksData();        
        }, [])

    const statsEventHandler = () => {
        console.log("Executed the query")
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT COUNT(user_contact_duration)  as count FROM user_table GROUP BY user_contact_duration',
            [],
            (tx, results) => {
              //console.log('********* Results OF STATS: ');
              updateStatsValue(results.rows.item(0), results.rows.item(1), results.rows.item(2))              
            }
          );
        });
      }

      //last 14 days details
        const lastTwoWeeksData = () => {
            console.log("Inside lastTwoWeeksData function ")
            db.transaction((tx) => {
            tx.executeSql(
                //'SELECT COUNT(user_contact_duration)  as count FROM user_table where DATE_FORMAT(user_entered_date_time,"%m-%d-%y") > "11-20-2020" GROUP BY user_contact_duration',
                //(SELECT datetime("now","localtime")-3)
                //'SELECT count(*) FROM user_table where user_entered_date_time > (datetime("now","localtime")-14)',
                //'(SELECT datetime("now","localtime")',
                'SELECT count(user_contact_duration) as count FROM user_table where user_entered_date_time between datetime("now", "-14 days") and datetime("now","localtime") GROUP BY user_contact_duration',
                [],
                (tx, results) => {
                console.log('Results OF STATS low: ',results.rows.item(0), " medium: ",results.rows.item(1)," high: ",results.rows.item(2));
                updateStatsValueTwoWeeks(results.rows.item(0), results.rows.item(1), results.rows.item(2))              
                }
            );
            });
        }

    function updateStatsValue(high, low, medium){  
        console.log("Inside updateStatsValue function")      
        //if(low.count === undefined )
        if(typeof low.count === 'undefined')
            setLowStats(0)
        else
            setLowStats(low.count)
        if(medium.count === undefined )
            setMediumStats(0)
        else
            setMediumStats(medium.count)
        if(high.count === undefined )
            setHighStats(0)
        else
            setHighStats(high.count)        
    }

    //for 2 weeks data
    function updateStatsValueTwoWeeks(high, low, medium){
        console.log("Value of low.count: ",low.count)
        //if(typeof low.count === 'undefined')
        if(low.count === undefined )
            setLowStatsTwoWeeks(0)
        else
            setLowStatsTwoWeeks(low.count)
        if(medium.count === undefined )
            setMediumStatsTwoWeeks(0)
        else
            setMediumStatsTwoWeeks(medium.count)
        if(high.count === undefined )
            setHighStatsTwoWeeks(0)
        else
            setHighStatsTwoWeeks(high.count)        
    }

    return(
        <View style={styles.screen}>
            <Text>The ShowStatScreen Screen</Text>            
            <ReportBarChart low={lowStats} medium={mediumStats} high={highStats}/>
            <Text style={styles.textStyle}>Stats for last 2 weeks</Text> 
            <ReportBarChart low={lowStatsTwoWeeks} medium={mediumStatsTwoWeeks} high={highStatsTwoWeeks}/>
        </View>
    );
};
ShowStatScreen.navigationOptions = {
    headerTitle: 'Statistics'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontWeight: "bold",
    }
});

export default ShowStatScreen;