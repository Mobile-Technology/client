import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Loading from '../components/Loading'
import { useState } from 'react';
import { Text } from 'react-native-paper'

export default function Dashboard({ navigation, route }) {

  const [loading, setLoading] = useState(true)
  
  const loadingView = () =>{
    setTimeout(()=>{setLoading(false)},5000);
    return(
      <Loading></Loading>
    )
  }
  const view = () =>{
    return(
      <Background>
      {/* <Logo /> */}
      <Header>Let's go play!</Header>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Room',{user:route.params.user})
        }
      >
        Rooms
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Profile',{user:route.params.user})
        }
      >
        Profile
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Password',{user:route.params.user})
        }
      >
        Password
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
    )
  }

  return (
    <>
        {loading==true?loadingView():view()}
    </>
  )
}
