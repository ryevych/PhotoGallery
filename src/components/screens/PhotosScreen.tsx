import { StyleSheet, View, FlatList, Text, TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { colors } from "../../settings/colors";
import { photosApi } from "../../store/services/photoService";
import PhotoItemComponent from "../ItemComponents/PhotoItemComponent";
import { IPhoto } from "../../models/IPhoto";
import { favoritesActions } from "../../store/reducers/favoriteSlice";
import { useCallback, useState } from "react";
import { gridLayout } from "../../settings/gridLayout";

export default function PhotosScreen() {
  const [searchText, setSearchText] = useState("")
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
      <TextInput style={styles.searchInput} autoCapitalize="none" placeholder="Search item" value={searchText} onChangeText={setSearchText} />
      <FlatList
        data={photos?.filter(item => item.title.includes(searchText))}
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
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: gridLayout.gap / 2,
  },
  message: {
    fontSize: 48
  },
  searchInput: {
    borderBottomWidth: 1,
    width: "45%",
    fontSize: 20,
    margin: 10,
    alignSelf: "flex-end"
  }
});
