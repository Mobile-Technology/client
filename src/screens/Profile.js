import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'

const Profile = ({navigation,route}) => {
    const [name, setName] = useState({ value: route.params.user.name, error: '' })
    return (
         <Background>
         <BackButton goBack={navigation.goBack} />
            {/* <Logo /> */}
            <Header>Profile</Header>
            <Paragraph>
                {route.params.user.email}
            </Paragraph>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <Button
            mode="outlined"
            onPress={() => navigation.navigate('LoginScreen')}
            >
            Update
            </Button>
         </Background>  
    )
}

export default Profile
