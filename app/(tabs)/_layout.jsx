import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors} from './../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
        }}>
        <Tabs.Screen name='home' 
            options={{
                tabBarLabel:'Home',
                tabBarIcon:({color})=><Ionicons name="home" 
                size={24} color={color} />
            }}
        />
        <Tabs.Screen name='activities' 
            options={{
                tabBarLabel:'Activities',
                tabBarIcon:({color})=><FontAwesome name="list-ul" 
                size={24} color={color} />
            }}
        />
        <Tabs.Screen name='notifications' 
            options={{
                tabBarLabel:'Notifications',
                tabBarIcon:({color})=><Ionicons name="notifications" 
                size={24} color={color} />
            }}
        />
        <Tabs.Screen name='profile' 
            options={{
                tabBarLabel:'Profile',
                tabBarIcon:({color})=><MaterialIcons name="account-circle" 
                size={24} color={color} />
            }}
        />
    </Tabs>
  )
}