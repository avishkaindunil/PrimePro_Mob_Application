import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors} from './../constants/Colors'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from './../hooks/UseWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, SignUp, setActive } =
            await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {

            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

  return (
    <View>
        <View
            style={{
                display:'flex',
                // alignItems:'center',
                backgroundColor: '#e7ecff',
                // borderRadius:30,
            }}
        >
            <Text
                style={{
                    fontSize:30, 
                    fontFamily:'mulish-semibold',
                    fontWeight: 600,
                    marginTop:64,
                    marginLeft: 43,
                    }}
            > Welcome to </Text>
            <Image source={require('./../assets/images/Transparent.png')} 
                style={{
                    width:160,
                    height:160,
                    marginTop:-97,
                    marginLeft: 188,
                    alignItems:'center',
                }}
            />
        </View>
        <View style={{
            backgroundColor: 'white',
            marginTop: -18,
            borderRadius: 30,
            }}>
            <Text
                style={{
                    fontSize:26,
                    fontWeight:600,
                    fontFamily:'mulish-semibold',
                    marginTop:25,
                    textAlign:'center',

                }}
            > Your <Text style={{
                color:Colors.PRIMARY,
                fontFamily:'mulish-semibold'
            }}>Trusted Partner</Text> in Car Care
            </Text>
            <Text style={{
                fontSize:14,
                fontWeight:600,
                fontFamily:'mulish-medium',
                marginTop:5,
                marginLeft:30,
                marginRight:30,
                textAlign:'center',
                lineHeight:24,
            }}
            >
                PrimePro connects you with the best car wash and vehicle services. 
                Easily find, book, and manage services for a hassle-free car care 
                experience.
            </Text>
        </View>

        <View>
            <TouchableOpacity style={styles.btn}
            onPress={onPress}>
                <Text style={{
                    fontFamily: 'mulish-semibold',
                    fontSize:24,
                    color:'#fff',
                    textAlign:'center',
                }}>Let's Get Started</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        marginTop:30,
        backgroundColor:Colors.PRIMARY,
        marginLeft:70,
        marginRight:70,
        padding:12,
        borderRadius: 50,
    }
    
})