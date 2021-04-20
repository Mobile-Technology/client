import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'

const Password = ({navigation,route}) => {
    const [password, setPassword] = useState({ value: '', error: '' })
    const [newpassword, setNewpassword] = useState({ value: '', error: '' })
    return (
         <Background>
         <BackButton goBack={navigation.goBack} />
            {/* <Logo /> */}
            <Header>Change Password</Header>
            <TextInput
                label="Current Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <TextInput
                label="New Password"
                returnKeyType="done"
                value={newpassword.value}
                onChangeText={(text) => setNewpassword({ value: text, error: '' })}
                error={!!newpassword.error}
                errorText={newpassword.error}
                secureTextEntry
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

export default Password
