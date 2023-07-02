import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { IPhoto } from "../../models/IPhoto";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../hooks/redux";
import { favoritesActions } from "../../store/reducers/favoriteSlice";
import { colors } from "../../settings/colors";

interface PhotoItemComponentProps {
  item: IPhoto;
  isFavorite: boolean;
}

export default function PhotoItemComponent({
  item,
  isFavorite,
}: PhotoItemComponentProps) {
  const dispatch = useAppDispatch();

  const handleIconPress = () => {
    isFavorite
      ? dispatch(favoritesActions.removeFromFavorites(item.id))
      : dispatch(favoritesActions.addToFavorites(item));
  };

  const windowWidth = useWindowDimensions().width;
  const gap = 10;

  return (
    <View
      style={[
        styles.container,
        { width: windowWidth / 2 - (3 / 2) * gap, margin: gap / 2 },
      ]}
    >
      <Image style={styles.image} source={{ uri: item.thumbnailUrl }} />
      <Text style={styles.text}>{item.title}</Text>
      <MaterialCommunityIcons
        onPress={handleIconPress}
        name={isFavorite ? "heart" : "heart-outline"}
        size={35}
        color={colors.main}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  text: {
    width: "80%",
  },
  icon: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
});
