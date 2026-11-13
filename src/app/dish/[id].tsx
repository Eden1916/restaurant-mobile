import { menuItems } from "@/types";
import { getImageUrl } from "@/utils/images";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
export default function DishDetail(){

    const [dish, setDish] = useState<menuItems | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const {id} = useLocalSearchParams()

    useEffect(()=>{theDish()}, [])

    function theDish(){
        fetch(`${process.env.EXPO_PUBLIC_API_URL}/menu/${id}`)
        .then((r)=>r.json())
        .then((d)=> {
            setDish(d)
        }).catch((err)=>{
            setError("menu item not available")
                console.log(err.message)
            
        })
        .finally(()=> setLoading(false))
    }

    function handleRetry(){
  setLoading(true)
  setError("")
  theDish()
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

if (!dish) {
  return (
    <View style={styles.box}>
      <Text style={styles.error}>Dish details unavailable</Text>
    </View>
  )
}

const image = getImageUrl(dish.image_url)

return (
  <ScrollView style={styles.container}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.title}>{dish.name}</Text>
    <Text style={styles.category}>{dish.category_name}</Text>
    <Text style={styles.description}>{dish.description}</Text>
    <Text style={styles.price}>{dish.price} ETB</Text>
    
  </ScrollView>
)
}
const styles = StyleSheet.create({
    box:{flex:1, backgroundColor:"rgb(183, 181, 182)", justifyContent:"center", alignItems:"center"},
    loading: {color:"#450a03"},
    error: {color:"#900", textAlign:"center"},
    button: { backgroundColor:"#9e5104", borderRadius:5, margin:7, padding:5, textAlign:"center"},
    image: {width:"100%", height:250, borderRadius:5, resizeMode:"cover"},
    container: { padding:10},
    title: {fontWeight:"bold", textAlign:"center", fontSize:25, margin:3, color:"rgb(97, 5, 5)"},
    category: {textAlign:"center", fontWeight:"bold"},
    description: {textAlign:"center", margin:3},
    price:{textAlign: "center", fontWeight:"bold", color:"rgb(111, 30, 30)", margin:3}
})