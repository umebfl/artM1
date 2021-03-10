import R from 'ramda'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
    ImageBackground,
    Dimensions,
    Clipboard,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'


const KeyboardAvoidingComponent = () => {
    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container} >
            <ScrollView style={styles.inner}>
                <View style={{
                    height: 500,
                    backgroundColor: 'red',
                }}></View>
                <Text style={styles.header}>Header</Text>
                <View style={{
                    height: 500,
                }}>
                </View>
                <View style={{
                    height: 500,
                }}>
                    <TextInput placeholder="Username" style={styles.textInput} />
                </View>
                <View style={styles.btnContainer}>
                    <Button title="Submit" onPress={() => null} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        // justifyContent: "space-around",
        // backgroundColor: 'red',
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop: 12
    }
});

export default KeyboardAvoidingComponent;