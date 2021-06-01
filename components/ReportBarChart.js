import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory-native';


const ReportBarChart = (props) => {    
    const data = {
        meeting: [
            {x: 'High', y: props.high},
            {x: 'Medium', y: props.medium},
            {x: 'Low', y: props.low}
        ]
    };

    return(
        <View>
            <VictoryChart>
                <VictoryAxis label='Contact Duration' />
                <VictoryAxis dependentAxis
                label='Medium' 
                style={{
                    axisLabel:{
                        padding: 35,
                    }
                }}
                />
                {/* <VictoryBar data={data.meeting} 
                style={{ data: { fill: "blue" }, labels: { fill: "white" } }}
                alignment='start'
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryLabel dx={20} dy={30}/>}
                /> */}

                <VictoryBar data={data.meeting} 
                    style={{ data: 
                                    { 
                                        fill: ({ datum }) => {
                                            
                                            if (datum.x === "High"){return "#F8D3CF";}                                            
                                            if (datum.x === "Medium"){return "#F8F5CF";}                                            
                                            if (datum.x === "Low"){return "#CFF8E9";}                                                
                                        },
                                        //stroke: ({ index }) => +index % 2 === 0  ? "#000000" : "#c43a31",
                                        //fillOpacity: 0.7,
                                        stroke: "#000000",
                                        strokeWidth: 1
                                    },                                     
                    labels: { fill: "black" } }}
                    alignment='start'
                    labels={({ datum }) => {
                        if (datum.y !== 0)
                            return datum.y;
                    }}
                    labelComponent={<VictoryLabel dx={15} dy={30}/>}
                /> 

            </VictoryChart>
        </View>
    );
};


export default ReportBarChart;