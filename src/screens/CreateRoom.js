import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import { io } from "socket.io-client";
import axios from 'axios'

const CreateRoom = ({navigation,route}) => {
    const [name, setName] = useState('')
    const [id, setId] = useState()

    const socket = io.connect('https://tebar.spydercode.my.id', {
        path: "/io",
        extraHeaders: {
            "my-custom-header": "abcd"
        }
    });

    useEffect(() => {
        socket.on('update',(message)=>{
            console.log(message);
        });
    })
    const post = ()=>{
        axios.post('https://tebar.spydercode.my.id/api/rooms', {
            name: name,
            user_id: route.params.user.id, 
            status: 0, 
        })
            .then(function (responses) {
                axios.post('https://tebar.spydercode.my.id/api/room_plays', {
                    room_id: responses.data.data.id,
                    user_id: route.params.user.id, 
                    point: 0, 
                    status:0
                })
                    .then(function (response) {
                        axios.get('https://tebar.spydercode.my.id/api/users/status/'+route.params.user.id+'/'+1)
                        .then(response =>console.log(response))
                        socket.emit('update','Update');
                        navigation.navigate('Wait',{
                            user:route.params.user,
                            room_id:responses.data.data.id
                        })
                })
        })
            .catch(function (error) {
            console.log(error);
        });
    }

    return (
         <Background>
         <BackButton goBack={navigation.goBack} />
            {/* <Logo /> */}
            <Header>CreateRoom</Header>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name}
                onChangeText={(text) => setName(text)}
                error={!!name.error}
                errorText={name.error}
            />
            <Button
            mode="outlined"
            onPress={() => post()}
            >
            Create
            </Button>
         </Background>  
    )
}

export default CreateRoom
