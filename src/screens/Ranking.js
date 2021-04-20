import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Buttons from '../components/Button'
import { FlatList } from "react-native-gesture-handler"
import { ImageBackground, SafeAreaView, View } from 'react-native'
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Badge } from 'native-base';
import axios from 'axios'

const Ranking = ({navigation,route}) => {
    const [room, setRoom] = useState([])

    useEffect(() => {
        getRoom();
    },[])

    const getRoom = () =>{
        axios.get('https://tebar.spydercode.my.id/api/rooms')
            .then(response =>setRoom(response.data.data))
    }

    let listItemView = (item,data) => {
        return (
            <List>
                <ListItem thumbnail>
                <Left>
                    <Text>{item.id}</Text>
                </Left>
                <Body style={{ textAlign:'center' }}>
                    <Text>{item.name}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>{item.id}</Text>
                    </Button>
                </Right>
                </ListItem>
            </List>
        );
    };

    const kosong = ()=>{
        return(
            <Paragraph>DATA KOSONG!</Paragraph>
        )
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Ranking</Header>
            <View style={{ flex:1, width:'100%' }}>
            <List>
                <ListItem thumbnail>
                <Left>
                    <Text>Ranking</Text>
                </Left>
                <Body style={{ textAlign:'center' }}>
                    <Text>Nama pemain</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Point</Text>
                    </Button>
                </Right>
                </ListItem>
            </List>
                <FlatList
                    data={room}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={kosong()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>    
                    <Buttons
                    mode="outlined"
                    onPress={() => navigation.navigate('Dashboard')}
                    >
                    Home
                    </Buttons>
        </Background>
    )
}

export default Ranking
