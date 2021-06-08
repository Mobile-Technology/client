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
import { io } from "socket.io-client";

const Wait = ({navigation,route}) => {
    const [room, setRoom] = useState([])
    const [data, setData] = useState(null)
    const [idroomplay, setIdroomplay] = useState(null)
    const socket = io.connect('https://tebar.spydercode.my.id', {
        path: "/io",
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });
    useEffect(() => {
        getRoom();
        socket.on('update',(message)=>{
            getRoom();
        });
    })

    const getRoom = () =>{
        if(room.length==0){
            axios.get('https://tebar.spydercode.my.id/api/rooms/'+route.params.room_id)
            .then(response =>setRoom(response.data.data))
        }
        if(data==null){
            axios.get('https://tebar.spydercode.my.id/api/rooms/detail/'+route.params.room_id)
                .then(response =>setData(response.data))
        }
        if(idroomplay==null){
            axios.get('https://tebar.spydercode.my.id/api/roomPlay/'+route.params.user.id+'/'+route.params.room_id)
                .then(response =>setIdroomplay(response.data))
        }
    }
    
    const back = () => {
        axios.delete('https://tebar.spydercode.my.id/api/room_plays/'+ idroomplay)
            .then(function (response) {
                axios.get('https://tebar.spydercode.my.id/api/users/status/'+route.params.user.id+'/'+0)
                .then(function(response){
                    socket.emit('update','Update')
                    navigation.navigate('Room',{user:route.params.user})
                })
            });
    }

    let listItemView = (item,data) => {
        return (
            <List>
                <ListItem thumbnail>
                <Body>
                    <Text>{item.user_name}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Ready</Text>
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

    console.log(idroomplay);
    const buttonPlay = ()=>{
        return(
            <Buttons
                mode="outlined"
                onPress={() => navigation.navigate('Playing',{room_id:route.params.room_id,user:route.params.user})}
                >
                Play Game
            </Buttons>
        )
    }

    return (
        <Background>
            {/* <BackButton goBack={navigation.goBack} /> */}
            <Header>{data==null?null:data.name}</Header>
            <View style={{ flex:1, width:'100%' }}>
                <FlatList
                    data={room}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={kosong()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>    
                {data==null?null:data.user_id==route.params.user.id?buttonPlay():null}
                <Buttons
                mode="outlined"
                onPress={() => back()}
                >
                Keluar ruangan
                </Buttons>
        </Background>
    )
}

export default Wait
