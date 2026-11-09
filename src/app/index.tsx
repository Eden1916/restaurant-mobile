import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const API_BASE = (process.env.EXPO_PUBLIC_API_URL ?? '').replace('/api', '')

  function getImageUrl(image_url:string | null) {
    if(!image_url) return undefined;
    if(image_url.startsWith("/uploads/")) return `${API_BASE}${image_url}`;
    return image_url;
  }


  const [item, setItem] = useState<{id:string; name:string; price:number; image_url:string; description:string | null; category_name:string}[]>([])
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
      <Text style={styles.error}>unable to display menu</Text>
      <Pressable style = {styles.button} onPress={handleRetry}><Text>Retry</Text></Pressable>
    </View>
  )
}
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Liyu Restaurant</Text>
      <Text style={styles.subtitle}>Authentic Ethiopian Cuisine</Text>
      <FlatList
      data={item}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => {
      const photo = getImageUrl(item.image_url);
      return(
      <View style={styles.card}>
        <Image source={photo ? {uri:photo} : undefined} style={styles.menuImage}/>
        <View style={styles.info}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>{item.price} ETB</Text>
        </View>
      </View>)
    }}/>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {flex:1, backgroundColor:"rgb(183, 181, 182)", justifyContent:"center", alignItems:"center"},
  main: {flex:1, backgroundColor:"rgb(183, 181, 182)"},
  title: { color:"#450a05", fontWeight:"bold", fontSize:28, textAlign:"center" },
  subtitle: { color:"#464545", textAlign:"center"},
  button: { backgroundColor:"#9e5104", borderRadius:5, margin:7, padding:5, textAlign:"center"},
  loading: {color:"#450a03"},
  error: {color:"#900", textAlign:"center"},
  card: {backgroundColor:"white", justifyContent:"space-between", flexDirection:"row", padding:10, marginBottom:5, elevation:2, borderRadius:10},
  info: {flex:1},
  menuName: {flex:1, fontWeight:"bold", fontSize:18, textAlign:"center"},
  menuImage: {width:150, height:100, borderRadius:5, resizeMode:"cover"},
  description: {color:"#3a3939", textAlign:"center", flex:1},
  price: {textAlign:"center", fontWeight:"bold", color:"rgb(60, 3, 3)"}
})