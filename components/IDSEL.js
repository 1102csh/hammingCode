import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

const IDSEL = (props) => {

  const col0 = props.col0;
  const col1 = props.col1;
  const col2 = props.col2;
  const col3 = props.col3;
  const col4 = props.col4;
  const col5 = props.col5;
  const col6 = props.col6;
  const col7 = props.col7;
  const hex = props.hex? props.hex:"x";

  return (
    <View style = {styles.container}>
      <Text style = {styles.IDSEL}>IDSEL{props.num}</Text>
      <Text style = {[styles.col, col0 == 1 && styles.colActive]}>{col0}</Text>
      <Text style = {[styles.col, col1 == 1 && styles.colActive]}>{col1}</Text>
      <Text style = {[styles.col, col2 == 1 && styles.colActive]}>{col2}</Text>
      <Text style = {[styles.col, col3 == 1 && styles.colActive]}>{col3}</Text>
      <Text style = {[styles.col, col4 == 1 && styles.colActive]}>{col4}</Text>
      <Text style = {[styles.col, col5 == 1 && styles.colActive]}>{col5}</Text>
      <Text style = {[styles.col, col6 == 1 && styles.colActive]}>{col6}</Text>
      <Text style = {[styles.col, col7 == 1 && styles.colActive]}>{col7}</Text>
      <Text style = {styles.hex}>{hex}</Text>
    </View>
  )


}
const styles = StyleSheet.create({
  container : {
    height: 30,
    flexDirection : "row",
    marginBottom: 10,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  IDSEL : {
    color: "green",
    fontSize: 9.5,
    width: 37,
    marginTop: 6,
  },
  col : {
    width : 30,
    height: 30,
    color: "aqua",
    backgroundColor: "aqua",
    marginLeft: 10,
    textAlign: "center",
    borderRadius: 50
  },
  colActive : {
    color : "red",
    backgroundColor : "red"
  },
  hex : {
    marginLeft: 10,
    fontSize: 20,
    width: 30,
    fontWeight: "bold",
    color: "green"
  }
})

export default IDSEL;