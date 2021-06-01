import React from 'react';
import { View,StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Drawer, Text, TouchableRipple } from 'react-native-paper';
import { AuthContext } from '../components/context';



const DrawerContent = (props) =>{
    const { signOut } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>            
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                        icon={({color,size}) =>(
                            <MatIcon 
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={()=>{props.navigation.navigate('Home')}}
                        />

                        <DrawerItem 
                        icon={({color,size}) =>(
                            <MatIcon 
                            name="view-dashboard-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Dashboard"
                        onPress={()=>{props.navigation.navigate('Dashboard')}}
                        />

                        <DrawerItem 
                        icon={({color,size}) =>(
                            <MatIcon 
                            name="chart-bar"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Analytics"
                        onPress={()=>{props.navigation.navigate('Analytics')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color,size}) =>(
                        <MatIcon 
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={()=>{signOut()}}
                />
            </Drawer.Section>
        </View> 
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    drawerContent:{
        flex:1
    },
    drawerSection:{
        marginTop:15
    },

});