import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Buttons from '../components/Button'
import { FlatList } from "react-native-gesture-handler"
import { List, ListItem, Left, Body, Right, Thumbnail, Text, Button, View } from 'native-base';
import axios from 'axios'
import { io } from "socket.io-client";

const Room = ({navigation,route}) => {
    const [room, setRoom] = useState([]);
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
    },[])

    const getRoom = () =>{
        if(route.params.user.status==1){
            axios.get('https://tebar.spydercode.my.id/api/userRoom/'+route.params.user.id)
            .then(response =>navigation.navigate('Wait',{
                user:route.params.user,
                room_id:response.data
            }));
        }else{
            axios.get('https://tebar.spydercode.my.id/api/rooms')
                .then(response =>setRoom(response.data.data))
        }
    }

    const join = (id)=>{
        axios.post('https://tebar.spydercode.my.id/api/room_plays', {
            room_id: id,
            user_id: route.params.user.id, 
            point: 0, 
            status:0
        })
            .then(function (response) {
                axios.get('https://tebar.spydercode.my.id/api/users/status/'+route.params.user.id+'/'+1)
                .then(response =>console.log(response))
                socket.on('connection');
                socket.emit('update','Update');
                navigation.navigate('Wait',{
                    user:route.params.user,
                    room_id:id
                })
        })
            .catch(function (error) {
            console.log(error);
        });
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
                        <Text>{item.total}/10</Text>
                        <Button small style={{ paddingHorizontal:10 }} success onPress={() => join(item.id)}>
                            <Text>Join</Text>
                        </Button>
                        {item.user_id==route.params.user.id?buttonDelete(item.id):null}
                    </Right>
                    </ListItem>
                </List>
        );
    };

    const deleteRoom = (id)=>{
        axios.delete('https://tebar.spydercode.my.id/api/rooms/'+ id)
            .then(function (response) {
                socket.emit('update','Update')
                getRoom()
            });
    }

    const kosong = ()=>{
        return(
            <Paragraph>DATA KOSONG!</Paragraph>
        )
    }

    const buttonDelete = (id)=>{
        return(
            <Button small style={{ paddingHorizontal:10 }} danger onPress={() => deleteRoom(id)}>
                <Text>Delete</Text>
            </Button>
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
                    onPress={() => navigation.navigate('CreateRoom',{user:route.params.user})}
                    >
                    Create Room
                    </Buttons>
        </Background>
    )
}

export default Room
