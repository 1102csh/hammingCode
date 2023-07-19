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

  const chartFontSize = props.chartFontSize;
  const hexFontSize = props.hexFontSize;

  return (
    <View style = {styles.container}>
      <Text style = {[styles.IDSEL, {fontSize:chartFontSize}]}>IDSEL{props.num}</Text>
      <View style={styles.colContainer}><Text style = {[styles.col, col0 == 1 && styles.colActive]}>{col0}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col1 == 1 && styles.colActive]}>{col1}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col2 == 1 && styles.colActive]}>{col2}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col3 == 1 && styles.colActive]}>{col3}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col4 == 1 && styles.colActive]}>{col4}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col5 == 1 && styles.colActive]}>{col5}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col6 == 1 && styles.colActive]}>{col6}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.col, col7 == 1 && styles.colActive]}>{col7}</Text></View>
      <View style={styles.colContainer}><Text style = {[styles.hex, {fontSize:hexFontSize}]}>{hex}</Text></View>
    </View>
  )

}
const styles = StyleSheet.create({
  container : {
    height: 30,
    width: "95%",
    flexDirection : "row",
    marginBottom: "1.7%",
    marginLeft: "2.5%",
    justifyContent: "center",
    alignItems: "center"
  },
  IDSEL : {
    color: "green",
    width: "10.6%",
  },
  colContainer : {
    width: "8.6%",
    marginLeft: "1.7%",
  },
  col : {
    width : 30,
    height: 30,
    color: "aqua",
    backgroundColor: "aqua",
    textAlign: "center",
    borderRadius: 50
  },
  colActive : {
    color : "red",
    backgroundColor : "red"
  },
  hex : {
    marginLeft: "10%",
    width: 30,
    fontWeight: "bold",
    color: "green"
  }
})

export default IDSEL;