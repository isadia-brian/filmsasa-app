import { Home, Clapperboard, Tv, Baby } from "lucide-react-native";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "teal" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
          tabBarLabelStyle: {
            fontFamily: "Poppins",
          },
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          headerShown: false,
          tabBarIcon: ({ color }) => <Clapperboard color={color} size={24} />,
          tabBarLabelStyle: {
            fontFamily: "Poppins",
          },
        }}
      />
      <Tabs.Screen
        name="series"
        options={{
          title: "Series",
          headerShown: false,
          tabBarIcon: ({ color }) => <Tv color={color} size={24} />,
          tabBarLabelStyle: {
            fontFamily: "Poppins",
          },
        }}
      />
      <Tabs.Screen
        name="kids"
        options={{
          title: "Kids",
          headerShown: false,
          tabBarIcon: ({ color }) => <Baby color={color} size={24} />,
          tabBarLabelStyle: {
            fontFamily: "Poppins",
          },
        }}
      />
    </Tabs>
  );
}
