import React, { useEffect, useState, useSetState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReportBarChart from '../components/ReportBarChart';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryLine } from 'victory-native';
import { RadioButton } from 'react-native-paper';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('UserManagementDatabase.db');

//const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const graphicColor = ['#A3F39C', '#93CFF1', '#F39C9C']; // Colors
//const wantedGraphicData = [{x: "Low", y: {lowStats} }, {x: "Medium", y: {mediumStats} }, {x: "High", y: {highStats} }]; // Data that we want to display
//const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }];
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

const ShowStatScreen = ({navigation}) =>{

    const [ lowStats, setLowStats] = useState(0);
    const [ mediumStats, setMediumStats] = useState(0);
    const [ highStats, setHighStats] = useState(0);
    const [ isDataPresent, setIsDataPresent] = useState('false');

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    const [checked, setChecked] = useState('1high');
    //const [checked, setChecked, getChecked] = useSetState("");
    //const [checkButton, setCheckButton] = useState('1high');
    const [ weekOneCount, setWeekOneCount] = useState(0);
    const [ weekTwoCount, setWeekTwoCount] = useState(0);
    const [ weekThreeCount, setWeekThreeCount] = useState(0);

    const [isDB, setIsDB] = useState(false);

    //used for loading getEventDetails at the beginning of the screen load
    useEffect(() => {
        // write your code here, it's like componentWillMount
        
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            statsEventHandler();   
            // lastThreeWeeksDataWeek1(); 
            // lastThreeWeeksDataWeek2(); 
            // lastThreeWeeksDataWeek3(); 
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
        
        }, [navigation])

    
    useEffect(() => {
        console.log("re-render because checked value changed:", checked)
        setIsDB(true);
    }, [checked])

    // useEffect(() => {
    //   setGraphicData(wantedGraphicData); // Setting the data that we want to display
    // }, []);

    if(isDB){
        lastThreeWeeksData();
    //    lastThreeWeeksDataWeek1(); 
    //     lastThreeWeeksDataWeek2(); 
    //     lastThreeWeeksDataWeek3();  
    }

    
    
    const setCheckValue = (val) => {        
    //async function setCheckValue(val) {        
        //setCheckButton(val)
        //setChecked(val);

        console.log("x before setting:", checked)
        setChecked(val);
        //setX(10)
        console.log("x in *line* after setting:", checked)

        
        // setChecked((state) => {
        // console.log("$$$$$$$$$$$$$$$$$ ",state); // "React is awesome!"
        
        // return state;
        // });

        console.log("The value is*************: ",val);
        console.log("The value of checked *************: ",checked);
        //console.log("The value is set");
        //lastThreeWeeksData();
        // lastThreeWeeksDataWeek1(); 
        // lastThreeWeeksDataWeek2(); 
        // lastThreeWeeksDataWeek3(); 
    }
    
    // const getCountFromDB = () => {
    //     console.log("From the getCountFromDB")
    //     lastThreeWeeksDataWeek1(); 
    //     lastThreeWeeksDataWeek2(); 
    //     lastThreeWeeksDataWeek3();
    // }    
    

    //state to capture last 14 days result
    // const [ lowStatsTwoWeeks, setLowStatsTwoWeeks] = useState(0);
    // const [ mediumStatsTwoWeeks, setMediumStatsTwoWeeks] = useState(0);
    // const [ highStatsTwoWeeks, setHighStatsTwoWeeks] = useState(0);

    //used for loading getEventDetails at the beginning of the screen load
    // useEffect(() => {
    //     // write your code here, it's like componentWillMount
    //     statsEventHandler(); 
    //     //lastTwoWeeksData();        
    //     }, [])

    // useEffect(() => {
    //     // write your code here, it's like componentWillMount
    //     lastTwoWeeksData();        
    //     }, [])

    const statsEventHandler = () => {
        console.log("Executed the query")
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT COUNT(user_contact_duration)  as count FROM user_table GROUP BY user_contact_duration',
            [],
            (tx, results) => {
              //console.log('********* Results OF STATS: ',results.rows.item(0)," : ",results.rows.item(1)," : ",results.rows.item(2));
              var lowDBCount = 0;
              var medDBCount = 0;
              var highDBCount = 0;
              
              if(!(typeof results.rows.item(0) == 'undefined')){
                //console.log("*********** Inside if clause of low")
                lowDBCount = results.rows.item(0)["count"];
                setIsDataPresent('true');
              }
              if(!(typeof results.rows.item(1) == 'undefined')){
                medDBCount = results.rows.item(1)["count"];
                setIsDataPresent('true');
              }
              if(!(typeof results.rows.item(2) == 'undefined')){
                highDBCount = results.rows.item(2)["count"];
                setIsDataPresent('true');
              }
            
              //updateStatsValue(results.rows.item(0), results.rows.item(1), results.rows.item(2))              
              updateStatsValue(lowDBCount, medDBCount, highDBCount);       
            }
          );
        });
      }

      //last 14 days details
        // const lastTwoWeeksData = () => {
        //     console.log("Inside lastTwoWeeksData function ")
        //     db.transaction((tx) => {
        //     tx.executeSql(
        //         //'SELECT COUNT(user_contact_duration)  as count FROM user_table where DATE_FORMAT(user_entered_date_time,"%m-%d-%y") > "11-20-2020" GROUP BY user_contact_duration',
        //         //(SELECT datetime("now","localtime")-3)
        //         //'SELECT count(*) FROM user_table where user_entered_date_time > (datetime("now","localtime")-14)',
        //         //'(SELECT datetime("now","localtime")',
        //         'SELECT count(user_contact_duration) as count FROM user_table where user_entered_date_time between datetime("now", "-14 days") and datetime("now","localtime") GROUP BY user_contact_duration',
        //         [],
        //         (tx, results) => {
        //         console.log('Results OF STATS low: ',results.rows.item(0), " medium: ",results.rows.item(1)," high: ",results.rows.item(2));
        //         updateStatsValueTwoWeeks(results.rows.item(0), results.rows.item(1), results.rows.item(2))              
        //         }
        //     );
        //     });
        // }

        //last 21 days details
        function lastThreeWeeksData(){
            setWeekOneCount(0);
            setWeekTwoCount(0);
            setWeekThreeCount(0);
            console.log("********** Inside lastThreeWeeksData function *********** checked value: ",checked)
            db.transaction((tx) => {
            tx.executeSql(                
                'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-7 days") and date("now","localtime")',
                [checked],
                (tx, results) => {
                //console.log('Results of week1 count: ',results.rows.item(0)["count"]);
                setWeekOneCount(results.rows.item(0)["count"])              
                }
            );

            
            tx.executeSql(                
                //'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat >= date("now", "-8 days") and dateFormat <= date("now","-14 days")',
                'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-14 days") and date("now","-8 days")',
                [checked],
                (tx, results) => {
                //console.log('Results of week2 count: ',results.rows.item(0)["count"]," and value of checked: ",checked);
                setWeekTwoCount(results.rows.item(0)["count"])              
                }
            );


            tx.executeSql(                
                'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-21 days") and date("now","-15 days")',
                [checked],
                (tx, results) => {
                //console.log('Results of week3 count: ',results.rows.item(0)["count"]," and value of checked: ",checked);
                setWeekThreeCount(results.rows.item(0)["count"])              
                }
            );

            });
            setIsDB(false);
        }

        // function lastThreeWeeksDataWeek1(){
        //     setWeekOneCount(0);                    
        //     console.log("********** Inside lastThreeWeeksData function *********** checked value: ",checked)
        //     db.transaction((tx) => {
        //     tx.executeSql(                
        //         'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-7 days") and date("now","localtime")',
        //         [checked],
        //         (tx, results) => {
        //         //console.log('Results of week1 count: ',results.rows.item(0)["count"]);
        //         setWeekOneCount(results.rows.item(0)["count"])              
        //         }
        //     );
        //     });
        // }

        // function lastThreeWeeksDataWeek2(){            
        //     setWeekTwoCount(0);                      
        //     console.log("********** Inside lastThreeWeeksData function *********** checked value: ",checked)
        //     db.transaction((tx) => {           
            
        //     tx.executeSql(                
        //         //'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat >= date("now", "-8 days") and dateFormat <= date("now","-14 days")',
        //         'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-14 days") and date("now","-8 days")',
        //         [checked],
        //         (tx, results) => {
        //         //console.log('Results of week2 count: ',results.rows.item(0)["count"]," and value of checked: ",checked);
        //         setWeekTwoCount(results.rows.item(0)["count"])              
        //         }
        //     );
        //     });
        // }


        // function lastThreeWeeksDataWeek3(){
        //     setWeekThreeCount(0);            
        //     console.log("********** Inside lastThreeWeeksData function *********** checked value: ",checked)
        //     db.transaction((tx) => {
            
        //     tx.executeSql(                
        //         'SELECT count(*) as count FROM user_table where user_contact_duration = ? and dateFormat between date("now", "-21 days") and date("now","-15 days")',
        //         [checked],
        //         (tx, results) => {
        //         //console.log('Results of week3 count: ',results.rows.item(0)["count"]," and value of checked: ",checked);
        //         setWeekThreeCount(results.rows.item(0)["count"])              
        //         }
        //     );

        //     });
        //     setIsDB(false);
        // }


    function updateStatsValue(low, medium, high){  
        //console.log("Inside updateStatsValue function: ",low," : ",medium," : ",high)      
        //if(low.count === undefined )
        // if((typeof low.count) === 'undefined')
        //     setLowStats(0)
        // else{
        //     setLowStats((low.count/high.count+medium.count+low.count)*100);
        //     console.log("Value of lowStats: ",lowStats);
        // }            
        // if((typeof medium.count) === 'undefined' )
        //     setMediumStats(0)
        // else{
        //     setMediumStats((medium.count/high.count+medium.count+low.count)*100);
        //     console.log("Value of mediumStats: ",mediumStats);
        // }            
        // if((typeof high.count) === 'undefined' )
        //     setHighStats(0)
        // else{
        //     setHighStats((high.count/high.count+medium.count+low.count)*100)  
        //     console.log("Value of highStats: ",highStats);
        // } 
        //console.log("low: ",(low/(low+medium+high))*100," med: ",(medium/(low+medium+high))*100," high: ",(high/(low+medium+high))*100)
        setLowStats((low/(low+medium+high))*100);
        setMediumStats((medium/(low+medium+high))*100);
        setHighStats((high/(low+medium+high))*100); 
        if(isDataPresent){
            setDataValue((low/(low+medium+high))*100, (medium/(low+medium+high))*100, (high/(low+medium+high))*100);
        }                 
    }

    const setDataValue = (low,med,high) => {
        //console.log("********* low: ",low,med,high)
        var lowPerct = (low/(low+med+high))*100;
        var medPerct = (med/(low+med+high))*100;
        var highPerct = (high/(low+med+high))*100;
        const wantedGraphicData = [{x: "Low"+"- "+lowPerct+"%", y: low }, {x: "Medium"+"- "+medPerct+"%", y: med }, {x: "High"+"- "+highPerct+"%", y: high }]; // Data that we want to display
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }

    let statScreenDisp = <View></View>
    //if((lowStats || mediumStats || highStats )!==0){    
    if(isDataPresent){ 
        //console.log("Inside if block") 
        statScreenDisp = 
        <View style={{paddingLeft: 40}} >
            <VictoryPie
            animate={{ easing: 'exp' }}
            data={graphicData}
            width={350}
            height={250}
            colorScale={graphicColor}
            innerRadius={50}
            style={{labels:{fill:'white'}}}
            />
        </View>
        
    }


    let chartScreenDisp = <View></View>
    //if((lowStats || mediumStats || highStats )!==0){    
    if(isDataPresent){ 
        console.log("Value of Week1 count: ",weekOneCount) 
        console.log("Value of Week2 count: ",weekTwoCount) 
        console.log("Value of Week3 count: ",weekThreeCount) 
        chartScreenDisp = 
        <View style={{paddingLeft: 20}} >
            <VictoryChart
            theme={VictoryTheme.material}
            >
                <VictoryLine                         
                    //interpolation="natural"
                    style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                    }}
                    data={[
                    { x: 1, y: weekOneCount },
                    { x: 2, y: weekTwoCount },
                    { x: 3, y: weekThreeCount },
                    
                    ]}
                    categories={{ x: ["Week1", "Week2", "Week3"] }}                    
                />
            </VictoryChart>
        </View>
        
    }
    //for 2 weeks data
    // function updateStatsValueTwoWeeks(high, low, medium){
    //     console.log("Value of low.count: ",low.count)
    //     //if(typeof low.count === 'undefined')
    //     if(low.count === undefined )
    //         setLowStatsTwoWeeks(0)
    //     else
    //         setLowStatsTwoWeeks(low.count)
    //     if(medium.count === undefined )
    //         setMediumStatsTwoWeeks(0)
    //     else
    //         setMediumStatsTwoWeeks(medium.count)
    //     if(high.count === undefined )
    //         setHighStatsTwoWeeks(0)
    //     else
    //         setHighStatsTwoWeeks(high.count)        
    // }

    return(
        // <View style={styles.screen}>
        //     <Text>The ShowStatScreen Screen</Text>            
        //     <ReportBarChart low={lowStats} medium={mediumStats} high={highStats}/>
        //     <Text style={styles.textStyle}>Stats for last 2 weeks</Text> 
        //     <ReportBarChart low={lowStatsTwoWeeks} medium={mediumStatsTwoWeeks} high={highStatsTwoWeeks}/>
        // </View>

        <View style={styles.screen}>
            <View>
                <View style={{marginTop:30}}>
                    <Text style={styles.heading}>Overall Stats</Text>
                </View>
                {statScreenDisp}  
                <View>
                    <View>
                        <Text style={styles.heading}>Stats for 3 weeks</Text>
                    </View>
                    <View style={styles.button}>
                        <View style={styles.radioButton}>
                            <Text style={{...styles.textRadioButton,color:'#F39C9C'}}>High</Text>
                            <RadioButton
                                value="1high"
                                status={ checked === '1high' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('1high')}
                                color="white"
                                uncheckedColor="grey"
                            />
                        </View>
                        <View style={styles.radioButton}>
                            <Text style={{...styles.textRadioButton, color:'#93CFF1'}}>Medium</Text>
                            <RadioButton
                                value="2medium"
                                status={ checked === '2medium' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('2medium')}
                                color="white"
                                uncheckedColor="grey"
                            />
                        </View>
                        <View style={styles.radioButton}>
                        <Text style={{...styles.textRadioButton, color:'#A3F39C'}}>Low</Text>
                            <RadioButton
                                value="3low"
                                status={ checked === '3low' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('3low')}
                                color="white"
                                uncheckedColor="grey"
                            />
                        </View>
                    </View>                    
                    {chartScreenDisp}
                </View>
                
            </View>            
        </View>

    );
};
ShowStatScreen.navigationOptions = {
    headerTitle: 'Statistics Here'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#000000'
    },
    textStyle: {
        fontWeight: "bold",
    },
    radioButton:{
        flexDirection: "row",
        //padding: 5,
        paddingHorizontal:30
    },
    button:{
        flexDirection:"row",
        backgroundColor:'#000000',
        borderRadius:60,
        height:35,
                
    },
    textRadioButton:{
        color: "#009387",
        fontSize: 18,
        fontWeight:"200",
        lineHeight:30
    },
    heading:{
        color: '#E7F9EA',
        fontSize:24,
        paddingHorizontal:30,
        //marginTop:10
        //padding:30
    }
});

export default ShowStatScreen;