import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "./screens/FavoritesScreen";
import PhotosScreen from "./screens/PhotosScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../settings/colors";

export default function Navigation() {
  const Tab = createBottomTabNavigator();

  const tabNames = {
    photos: "Photos",
    favorites: "Favorites",
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.main,
          },
          headerTitleStyle: {
            color: "white",
          },
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => {
            interface IIcon {
              [index: string]: string;
            }
            const icon = {
              [tabNames.photos]: "picture-in-picture-bottom-right",
              [tabNames.favorites]: "heart",
            };

            const currentIcon = icon[route.name];
            // let key: keyof typeof icon;
            // const key = route.name;
            // const icons = key in icon ? icon[key] : "";
            return (
              <MaterialCommunityIcons
                name={currentIcon}
                color={color}
                size={size}
              />
            );
          },
        })}
      >
        <Tab.Screen name={tabNames.photos} component={PhotosScreen} />
        <Tab.Screen name={tabNames.favorites} component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
