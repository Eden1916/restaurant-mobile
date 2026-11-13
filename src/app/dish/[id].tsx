import { useLocalSearchParams } from "expo-router";
import { Text, View } from 'react-native';
export default function DishDetail(){
    const {id} = useLocalSearchParams()
    return(
        <View>
            <Text>Dish {id}</Text>
        </View>
    )

}