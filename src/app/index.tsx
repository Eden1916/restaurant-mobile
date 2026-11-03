import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {

  const [item, setItem] = useState([])
  function handleClick() {
}

useEffect(() => {
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/menu`)
  .then((r)=>r.json())
  .then((d)=> {
     setItem(menu=>d.length)
  })
  .catch(() => {
    console.log("you make mistake")
  })
}, [])
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Liyu Restaurant</Text>
      <Text style={styles.subtitle}>Authentic Ethiopian Cuisine</Text>
      <Text>Item: {item}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {flex:1, alignItems:"center", justifyContent:"center" },
  title: { color:"#450a05", fontWeight:"bold", fontSize:28 },
  subtitle: { color:"#464545"},
  button: { backgroundColor:"#9e5104", borderRadius:5, margin:7, padding:5}
})