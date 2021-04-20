import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import { Image, StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Text } from 'native-base'

const Playing = ({navigation,route}) => {
    const [name, setName] = useState({ value: '', error: '' })
    return (
         <Background>
         <BackButton goBack={navigation.goBack} />
            <Paragraph>Nama Ruangan</Paragraph>
            <Paragraph>Countdown</Paragraph><Text> 90</Text>
            <Image 
                style={{ width:150,height:150 }}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
            <TextInput
                label="Answer"
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
            Submit
            </Button>
            <View style={{ width:'100%' }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>No</DataTable.Title>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Correct</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>2</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>3</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>4</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>5</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>6</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>7</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>8</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                    <DataTable.Cell>80</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>9</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>10</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                    <DataTable.Cell>Kucing</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            </View>
        </Background>  
    )
}

const styles = StyleSheet.create({
    HeadStyle: { 
        height: 50,
        flex:3,
        backgroundColor: '#ffe0f0',
        textAlign:'center',
        alignItems:'center',
    },
    TableText: { 
      margin: 10
    }
  });

export default Playing
