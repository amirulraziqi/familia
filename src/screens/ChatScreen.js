import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat';

const auth = firebase.auth();
const db = firebase.firestore().collection('messages');

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        // Listener for authentication
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Chat');
            } else {
                navigation.navigate('Login');
            }
        })

        // Sets up top right button
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={logout}>
                    <MaterialCommunityIcons 
                        name="logout"
                        size={25}
                        color='white'
                        style={{
                            marginRight: 10
                        }}
                    />
                </TouchableOpacity>
            )
        });

        // loads data from firestore
        const unsubscribeSnapshot = db
        .orderBy('createdAt', 'desc')
        .onSnapshot((collectionSnapshot) => {
            const serverMessages = collectionSnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log(data);
                const returnData = {
                    ...doc.data(),
                    createdAt: new Date(data.createdAt.seconds * 1000), // convert to JS date
                };
                return returnData;
            });
            setMessages(serverMessages);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeSnapshot();
        };
    }, []);

    function sendMessages(newMessages) {
        console.log(newMessages);
        const newMessage = newMessages[0];
        db.add(newMessage);
        //setMessages([...newMessages, ...messages]);
    }
    
    function logout() {
        auth.signOut();
    };

    return (
        <GiftedChat 
            messages={messages}
            onSend={newMessages => {console.log(newMessages); sendMessages(newMessages)}}
            renderUsernameOnMessage={true}
            listViewProps={{
                style: {
                    backgroundColor: "#999290",
                },
            }}
            user={{
                _id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
            }}
        />
    )
};

const styles = StyleSheet.create({});

export default ChatScreen;
