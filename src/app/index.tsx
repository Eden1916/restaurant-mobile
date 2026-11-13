import { getImageUrl } from '@/utils/images';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {

  const [item, setItem] = useState<{id:string; name:string; price:number; image_url:string; description:string | null; category_name:string}[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const router = useRouter()

useEffect(() => {menuItems()}, [])
 function menuItems() {
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/menu`)
  .then((r)=>r.json())
  .then((d)=> {
     setItem(Array.isArray(d) ? d :[])
  }
)
  .catch((err) => {
    console.log(err.message)
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
//when a ctegory is clicked the menu items under that category will be visible
     const visibleItems = selectedCategory ==="All" ? item : item.filter((menu)=>menu.category_name === selectedCategory)

     //the category name form the database to have a button the the screen
     const categories = Array.from(new Set(item.map((category)=>category.category_name)))
     categories.unshift("All")


  return (
    <View style={styles.main}>
      <Text style={styles.title}>Liyu Restaurant</Text>
      <Text style={styles.subtitle}>Authentic Ethiopian Cuisine</Text>
      <View style={styles.buttons}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category)=>{
            const isSelected = category === selectedCategory
            return(
        <Pressable style={[styles.categories, isSelected && styles.categoriesSelected]} key={category} onPress={()=>setSelectedCategory(category)}>
          <Text style = {[styles.categoriesText, isSelected && styles.categoriesSelectedText]}>{category}</Text>
        </Pressable>
        )})}
        </ScrollView>
      </View>
      <FlatList
      data={visibleItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => {
      const photo = getImageUrl(item.image_url);
      return(
        <Pressable onPress={() => router.push({pathname: "/dish/[id]", params:{id:item.id}})}>
      <View style={styles.card}>
        <Image source={photo ? {uri:photo} : undefined} style={styles.menuImage}/>
        <View style={styles.info}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>{item.price} ETB</Text>
        </View>
      </View>
      </Pressable>)
    }}/>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {flex:1, backgroundColor:"rgb(183, 181, 182)", justifyContent:"center", alignItems:"center"},
  main: {flex:1, backgroundColor:"rgb(183, 181, 182)"},
  title: { color:"#450a05", fontWeight:"bold", fontSize:28, textAlign:"center" },
  subtitle: { color:"#464545", textAlign:"center"},
  buttons: {flexDirection:"row"},
  categories: {backgroundColor:"rgb(100, 35, 5)", padding:5, margin:5, borderRadius:5, justifyContent:"center", alignItems:"center"},
  button: { backgroundColor:"#9e5104", borderRadius:5, margin:7, padding:5, textAlign:"center"},
  loading: {color:"#450a03"},
  error: {color:"#900", textAlign:"center"},
  card: {backgroundColor:"white", justifyContent:"space-between", flexDirection:"row", padding:10, marginBottom:5, elevation:2, borderRadius:10},
  info: {flex:1},
  menuName: {flex:1, fontWeight:"bold", fontSize:18, textAlign:"center"},
  menuImage: {width:150, height:100, borderRadius:5, resizeMode:"cover"},
  description: {color:"#3a3939", textAlign:"center", flex:1},
  price: {textAlign:"center", fontWeight:"bold", color:"rgb(60, 3, 3)"},
  order: {alignItems:"center", backgroundColor:"rgb(219, 127, 46)", color:"white", borderRadius:5, alignSelf:"center", paddingHorizontal:6, marginTop:10 },
  categoriesSelected: {backgroundColor:"rgb(127, 44, 5)"},
  categoriesText: {color:"white", fontWeight:"bold"},
  categoriesSelectedText: {color:"black"}
})