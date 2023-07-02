import { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { colors } from "../../settings/colors";
import PhotoItemComponent from "../ItemComponents/PhotoItemComponent";

export default function FavoritesScreen() {
  const { favorites } = useAppSelector((state) => state.favoritesReducer);
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        renderItem={({ item }) => (
          <PhotoItemComponent item={item} isFavorite={true} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    alignItems: "center",
    justifyContent: "center",
  },
});
