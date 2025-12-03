import React from "react";
import { View, Text, FlatList } from "react-native";

const HomeScreen = () => {
    return (
        <View>
            <Text>Lista de Pokémons</Text>

            <FlatList 
                data={[]}
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
};

export default HomeScreen;