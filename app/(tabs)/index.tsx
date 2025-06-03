import AnimatedCarousel from "@/components/AnimatedCarousel";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";

import { View, ScrollView } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <AnimatedCarousel />
        <ThemedView type="container">
          <View>
            <ThemedText type="subtitle">Trending Movies</ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
