import { useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { colors } from "../../settings/colors";
import PhotoItemComponent from "../ItemComponents/PhotoItemComponent";
import { favoritesActions } from "../../store/reducers/favoriteSlice";
import { IPhoto } from "../../models/IPhoto";

export default function FavoritesScreen() {
  const { favorites } = useAppSelector((state) => state.favoritesReducer);

  const dispatch = useAppDispatch();

  const handleFavoriteIconPress = useCallback((item: IPhoto) => {
    dispatch(favoritesActions.removeFromFavorites(item.id));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        initialNumToRender={12}
        renderItem={({ item }) => (
          <PhotoItemComponent item={item} isFavorite={true}
            handleFavoriteIconPress={handleFavoriteIconPress}
          />
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
