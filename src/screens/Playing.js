import React, { useState, useEffect } from 'react'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { Modal, Portal} from 'react-native-paper';
import axios from 'axios'

const Playing = ({navigation,route}) => {
    const [name, setName] = useState('')
    const [time, setTime] = useState(10)
    const [correct, setCorrect] = useState(false)
    const [animalCount, setAnimalCount] = useState(0)
    const [point, setPoint] = useState(0)
    const [visible, setVisible] = useState(false);
    const [room, setRoom] = useState(null)
    const [idroomplay, setIdroomplay] = useState(null)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: correct?'green':'red', padding: 20, textAlign:'center'};

    useEffect(() => {
        countdown(time);
        getRoom();
    }, [time])

    const animal = ['anjing','ayam','badak','bebek','beruang','harimau','kelinci','kucing','panda','rakun','singa'];

    const getRoom = ()=>{
        if(room==null){
            axios.get('https://tebar.spydercode.my.id/api/rooms/detail/'+route.params.room_id)
                .then(response =>setRoom(response.data))
        }
        if(idroomplay==null){
            axios.get('https://tebar.spydercode.my.id/api/roomPlay/'+route.params.user.id+'/'+route.params.room_id)
                .then(response =>setIdroomplay(response.data))
        }
    }
    const countdown = (time) =>{
        time > 0 && setTimeout(() => setTime(time - 1), 1000);
        if(time == 0){
            if(name==animal[animalCount]){
                setPoint(point+10)
                setCorrect(true)
            }else{
                setCorrect(false)
            }
            showModal();
            setTimeout(()=>{
                setName('');
                hideModal();
                setTime(10);
                setAnimalCount(animalCount+1);
            },2000)
        }
        if(animalCount==10){
            axios.put('https://tebar.spydercode.my.id/api/room_plays/'+idroomplay, {
                point: point, 
                status:3
            })
            .then(function (response) {
                axios.get('https://tebar.spydercode.my.id/api/users/status/'+route.params.user.id+'/'+0)
                .then(response =>console.log(response))
                navigation.navigate('Ranking',{
                    user:route.params.user,
                    room_id:id
            })
        })
            .catch(function (error) {
            console.log(error);
        });
        }
    }


    return (
        <Background>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ textAlign:'center' }}>
                        <Image 
                            style={{ width:150,height:150 }}
                            source={require('../assets/image/ayam.png')}
                        />
                        <Text style={{ fontSize:30, color:'white', fontWeight:'bold' }}>{correct?'Jawaban benar':'Jawaban salah'}</Text>
                    </View>
                </Modal>
            </Portal>

            <Paragraph>{room==null?null:room.name}</Paragraph>
            <Text style={styles.text}>{time}</Text>
            <Image 
                style={{ width:150,height:150 }}
                source={require('../assets/image/ayam_Siluet.png')}
            />
            <Text style={{ fontSize:20, marginTop:10 }}>lorem impusm sae daadada</Text>
            <TextInput
                label="Answer"
                returnKeyType="next"
                value={name.toLowerCase()}
                onChangeText={(text) => setName(text)}
                error={!!name.error}
                errorText={name.error}
                style={{ textAlign:'center' }}
            />
            <Text style={styles.text}>Point: {point}</Text>
        </Background>  
    )
}

const styles = StyleSheet.create({
    text: { 
        fontSize: 30,
        fontWeight:'bold'
    }
});

export default Playing
