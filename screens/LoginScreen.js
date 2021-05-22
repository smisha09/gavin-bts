import * as React from 'react'
import {Text, View, StyleSheet, Button, TouchableOpacity, Image, TextInput, KeyboardAvoidingView} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    async login(email, password) {
        if(email && password) {
            try {
                const data = await firebase.auth().signInWithEmailAndPassword(email, password)
                if(data) {
                    this.props.navigation.navigate('Write')
                }
            } catch(error) {
                console.log(error.code)
                switch(error.code) {
                    case 'auth/user-not-found':
                        alert('This user does not exist.')
                        console.log('This user does not exist.')
                        break;
                    case 'auth/invalid-email':
                        alert('The provided email or password is invalid.')
                        console.log('The provided email or password is invalid.')
                        break;
                    case 'auth/invalid-password':
                        alert('The provided email or password is invalid.')
                        console.log('The provided email or password is invalid.')
                        break;
                    case 'auth/wrong-password':
                        alert('The provided email or password is invalid.')
                        console.log('The provided email or password is invalid.')
                        break;
                }
            }
        } else {
            alert('Please enter the email and/or password.')
        }
    }

    render() {
        return(
            <KeyboardAvoidingView style = {{
                    alignItems:'center',
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#4EB9E6'
                }}>
                <View>
                    <Image
                    source = {require('../assets/story.png')}
                    style = {{width: 200, height: 200, marginBottom: 50}}/>

                    <Text style = {{
                        textAlign: 'center',
                        fontSize: 30,
                        marginBottom: 20,
                        color: '#fff'
                    }}>Story Hub</Text>
                </View>
                <View>
                    <TextInput
                    style = {styles.emailId}
                    placeholder = "creator@storyhub.com"
                    keyboardType = "email-address"
                    onChangeText = {(text) => {
                        this.setState({
                            emailId: text
                        })
                    }}/>
                    <TextInput
                    style = {styles.password}
                    secureTextEntry = {true}
                    placeholder = "Enter your password"
                    onChangeText = {(text) => {
                        this.setState({
                            password: text
                        })
                    }}/>
                </View>
                <View>
                    <TouchableOpacity style = {{
                        height: 40,
                        width: 100,
                        borderWidth: 1,
                        marginTop: 20,
                        paddingTop: 10,
                        borderRadius: 20,
                        backgroundColor: '#62F7FC'
                    }}
                    onPress = {() =>{
                        this.login(this.state.emailId, this.state.password)
                    }}>
                        <Text style = {{
                            textAlign: 'center',
                            color: '#1D484A'
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    emailId :{
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        backgroundColor:"#4EE6C0",
        color:"#236655"
    },
    password: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
        backgroundColor:"#56FEA5",
        color:"#2B8053"
    }
})
