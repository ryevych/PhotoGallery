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
            backgroundColor: colors.header,
          },
          headerTitleStyle: {
            color: colors.main,
          },
          tabBarActiveBackgroundColor: colors.tabBarActiveBackgroundColor,
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size }) => {
            interface IIcon {
              [index: string]: keyof typeof MaterialCommunityIcons.glyphMap;
            }
            const icon: IIcon = {
              [tabNames.photos]: "picture-in-picture-bottom-right",
              [tabNames.favorites]: "heart",
            };

            let iconName: keyof typeof MaterialCommunityIcons.glyphMap = icon[route.name];
            iconName = icon[route.name];
            return (
              <MaterialCommunityIcons
                name={iconName}
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
