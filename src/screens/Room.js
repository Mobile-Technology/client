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

const Room = ({navigation,route}) => {
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
                    <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'https://img.icons8.com/ios/452/room.png' }} />
                    </Left>
                    <Body>
                        <Paragraph>{item.name}</Paragraph>
                        <Text>Public</Text>
                    </Body>
                    <Right>
                        <Text>3/10</Text>
                        <Button small style={{ paddingHorizontal:10 }} success onPress={() => navigation.navigate('Wait')}>Join</Button>
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
            <Header>Room</Header>
            <View style={{ flex:1, width:'100%' }}>
                <FlatList
                    data={room}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={kosong()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>    
                    <Buttons
                    mode="outlined"
                    onPress={() => navigation.navigate('LoginScreen')}
                    >
                    Create Room
                    </Buttons>
        </Background>
    )
}

export default Room
