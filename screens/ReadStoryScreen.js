import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            search : '',
            dataSource:[],
            allStories:[]
        }
    }

    retrieveStories() {
        var allStories = []
        db.collection("stories")
        .get()
        .then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                allStories.push(doc.data())
            })
            this.setState({
                allStories: allStories
            })
        })
    }

    componentDidMount() {
        this.retrieveStories()
    }

    searchFilterFunction(text) {
        const searchData = this.state.allStories.filter((item)=> {
            const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase()
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: searchData,
            search: text,
        });
    }

    render() {
        return (
            <View style = {styles.container}>
            <Header
                    backgroundColor={'#56A0FE'}
                    centerComponent={{
                    text: 'Story Hub',
                    style: { color: '#fff', fontSize: 40, marginBottom: 2 },
                }}
                containerStyle={{
                    height: 120
                }}
            />
            <SearchBar
                placeholder = "Search here..."
                value = {this.state.search}
                onChangeText = {text =>
                    this.searchFilterFunction(text)
                }
                onClear = {text =>
                    this.searchFilterFunction('')
                }
                containerStyle = {{justifyContent: 'center', width: 350, marginTop: 20}}
                cancelIconColor = "#c6c6c6"
                lightTheme = {true}
            />
            <FlatList
                data = {this.state.search === "" ? this.state.allStories : this.state.dataSource}
                renderItem = {({item}) => (
                    <View style={styles.stories}>
                        <Text style = {{
                            fontSize: 20,
                            color: '#236655'
                            }}>
                            {item.title}
                        </Text>
                        <Text style = {{
                            fontSize: 15,
                            color: '#236655'
                            }}>
                            {'By ' + item.author}
                        </Text>
                    </View>
                )}
                keyExtractor = {(item, index) => index.toString()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4EB9E6'
    },
    stories: {
        padding: 20,
        borderWidth: 2,
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#4EE6C0',
    }
})