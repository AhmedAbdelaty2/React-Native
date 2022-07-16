import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {StatusBar} from "expo-status-bar";
import Toast from "react-native-toast-message";

import colors from './constants/colors'
import AvailableCars from "./screens/AvailableCars";
import {Contact} from "./screens/Contact";
import {headerStyling} from "./constants/headerStyle";
import {styles} from "./constants/styles";
import CarDetails from "./screens/CarDetails";

export default function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createMaterialBottomTabNavigator();

    const HomeNavigator = () => {
        return (
            <Stack.Navigator initialRouteName="Cars" style={styles.container}>
                <Stack.Screen name={"Cars"}
                              component={AvailableCars}
                              options={{...headerStyling, ...{title: "Available Cars"}}}
                />
                <Stack.Screen name={"CarDetails"}
                              component={CarDetails}
                              options={
                                  ({route}) => ({
                                      ...headerStyling,
                                      ...{title: `${route.params.car.name} (${route.params.car.status})`}
                                  })}
                />
            </Stack.Navigator>
        );
    };

    const ContactNavigator = () => {
        return (
            <Stack.Navigator initialRouteName="Cars" style={styles.container}>
                <Stack.Screen name={"contact"}
                              component={Contact}
                              options={{...headerStyling, ...{title: "Contact us"}}}
                />
            </Stack.Navigator>
        );
    }

    const tabs = () => {
        return (
            <>
                <Tab.Navigator initialRouteName="Home"
                               backBehaviour={"History"}
                               activeColor={colors.active}
                               inactiveColor={colors.inActive}
                               barStyle={{backgroundColor: colors.navBackground, height: 50}}
                >
                    <Tab.Screen name="Home"
                                component={HomeNavigator}
                                options={{
                                    tabBarLabel: "Home",
                                    tabBarIcon: ({color}) => (
                                        <Ionicons name="car-sport-outline" color={color} size={25}/>
                                    ),
                                }}
                    />
                    <Tab.Screen name={"Contact"}
                                component={ContactNavigator}
                                options={{
                                    tabBarLabel: "contact",
                                    tabBarIcon: ({color}) => (
                                        <Ionicons name="call-outline" color={color} size={25}/>
                                    ),
                                }}
                    />
                </Tab.Navigator>
                <Toast/>
            </>
        )
    }

    return (
        <NavigationContainer>
            {tabs()}
            <StatusBar style={'light'}/>
        </NavigationContainer>
    );
}

