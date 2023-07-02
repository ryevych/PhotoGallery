import { StyleSheet, View, Text, FlatList } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { colors } from "../../settings/colors";
import { photosApi } from "../../store/services/photoService";
import PhotoItemComponent from "../ItemComponents/PhotoItemComponent";

export default function PhotosScreen() {
  const {
    isLoading,
    error,
    data: photos,
  } = photosApi.useFetchAllPhotosQuery(100);

  const { favorites } = useAppSelector((state) => state.favoritesReducer);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        numColumns={2}
        renderItem={({ item }) => (
          <PhotoItemComponent
            item={item}
            isFavorite={
              favorites.findIndex((favorite) => favorite.id == item.id) > -1
            }
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
