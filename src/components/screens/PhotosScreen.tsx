import { StyleSheet, View, FlatList, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { colors } from "../../settings/colors";
import { photosApi } from "../../store/services/photoService";
import PhotoItemComponent from "../ItemComponents/PhotoItemComponent";
import { IPhoto } from "../../models/IPhoto";
import { favoritesActions } from "../../store/reducers/favoriteSlice";
import { useCallback } from "react";

export default function PhotosScreen() {
  const {
    isLoading,
    error,
    data: photos,
  } = photosApi.useFetchAllPhotosQuery(100);

  const { favorites } = useAppSelector((state) => state.favoritesReducer);

  const dispatch = useAppDispatch();

  const handleFavoriteIconPress = useCallback((item: IPhoto, isFavorite: boolean) => {
    isFavorite
      ? dispatch(favoritesActions.removeFromFavorites(item.id))
      : dispatch(favoritesActions.addToFavorites(item));
  }, []);

  if (isLoading) {
    return (<View style={styles.container}><Text style={styles.message}>Loading...</Text></View>);
  }

  if (error) {
    return (<View style={styles.container}><Text style={styles.message}>Error!</Text></View>);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        numColumns={2}
        initialNumToRender={12}
        renderItem={({ item }) => (
          <PhotoItemComponent
            item={item}
            isFavorite={
              favorites.findIndex((favorite) => favorite.id == item.id) > -1
            }
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
  message: {
    fontSize: 48
  }
});
