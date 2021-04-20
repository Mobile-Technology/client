import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';

const AppHeader = (props) => {
  const _goBack = () => console.log('Went back');

  return (
    <Appbar.Header statusBarHeight="0" style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={props.name} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
   header: {
      backgroundColor:'',
      opacity:'30%',
   },
})

export default AppHeader;