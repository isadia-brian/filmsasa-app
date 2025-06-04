import AnimatedCarousel from "@/components/AnimatedCarousel";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import TrendingCard from "@/components/TrendingCard";
import { getTrendingFilms } from "@/services/api";
import useFetch from "@/services/useFetch";

import { View, ScrollView, ActivityIndicator, FlatList } from "react-native";

const HomeScreen = () => {
  const {
    data: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingFilms);

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
            {trendingLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : trendingError ? (
              <ThemedText type="subtitle">
                Error:{trendingError.message}
              </ThemedText>
            ) : (
              <View>
                {trending && (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="my-4"
                    data={trending}
                    contentContainerStyle={{
                      gap: 26,
                    }}
                    renderItem={({ item, index }) => (
                      <TrendingCard film={item} index={index} />
                    )}
                    keyExtractor={(item) => item.tmdbId.toString()}
                    ItemSeparatorComponent={() => <View className="w-2" />}
                  />
                )}
              </View>
            )}
          </View>
        </ThemedView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
