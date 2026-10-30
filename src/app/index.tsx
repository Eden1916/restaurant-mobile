import { StyleSheet, Text, View } from "react-native";

export default function index() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Liyu Restaurant</Text>
      <Text style={styles.subtitle}>Authentic Ethiopian Cuisine</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  box: {flex:1, alignItems:"center", justifyContent:"center" },
  title: { color:"#450a05", fontWeight:"bold", fontSize:28 },
  subtitle: { color:"#464545"}
})