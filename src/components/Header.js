import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 81,
    color: theme.colors.dark,
    fontWeight: 'bold',
    paddingVertical: 12,
    fontFamily: 'Game On_PersonalUseOnly'
  },
})