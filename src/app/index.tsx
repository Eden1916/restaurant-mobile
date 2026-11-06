import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const [item, setItem] = useState<{id:string; name:string; price:number}[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

useEffect(() => {menuItems()}, [])
 function menuItems() {
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/menu`)
  .then((r)=>r.json())
  .then((d)=> {
     setItem(Array.isArray(d) ? d :[])
  })
  .catch(() => {
    console.log("you make mistake")
    setError("Can't fetch the menu items!")
  })
  .finally(()=>setLoading(false))
}

function handleRetry(){
  setLoading(true)
  setError("")
  menuItems()
}

if(loading){
  return(
    <View style={styles.box}>
      <Text style={styles.loading}>This may take a while</Text>
      <ActivityIndicator size="small" color="#954"></ActivityIndicator></View>
  )
}
else if(error) {
  return(
    <View style={styles.box}>
      <Text style={styles.error}>unable to display item number</Text>
      <Pressable style = {styles.button} onPress={handleRetry}><Text>Retry</Text></Pressable>
    </View>
  )
}
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Liyu Restaurant</Text>
      <Text style={styles.subtitle}>Authentic Ethiopian Cuisine</Text>
      <FlatList
      data={item}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <View style={styles.card}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text>{item.price} ETB</Text>
      </View>}/>
      <Text style={styles.subtitle}>Item: {item.length}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {flex:1, backgroundColor:"rgb(183, 181, 182)"},
  title: { color:"#450a05", fontWeight:"bold", fontSize:28 },
  subtitle: { color:"#464545"},
  button: { backgroundColor:"#9e5104", borderRadius:5, margin:7, padding:5},
  loading: {color:"#450a03"},
  error: {color:"#900"},
  card: {backgroundColor:"white", justifyContent:"space-between", flexDirection:"row", padding:3, marginBottom:3},
  menuName: {flex:1}
})