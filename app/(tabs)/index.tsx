import AnimatedCarousel from "@/components/AnimatedCarousel";
import FeaturedCard from "@/components/FeaturedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import TrendingCard from "@/components/TrendingCard";
import { getPopularFilms, getTrendingFilms } from "@/services/api";
import useFetch from "@/services/useFetch";
import { FeaturedCardProps, TrendingCardProps } from "@/types";
import { useCallback, useMemo } from "react";

import { View, ScrollView, ActivityIndicator, FlatList } from "react-native";

const HomeScreen = () => {
  const {
    data: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingFilms);

  const {
    data: popular,
    loading: popularLoading,
    error: popularError,
  } = useFetch(getPopularFilms);

  const memoizedTrending = useMemo(() => {
    return trending?.slice(0, 13);
  }, [trending]);

  const memoizedPopular = useMemo(() => {
    return popular?.slice(0, 13);
  }, [popular]);

  // Memoized renderer for list items
  const renderTrendingItem = useCallback(
    ({ item, index }: { item: TrendingCardProps["film"]; index: number }) => (
      <TrendingCard film={item} index={index} />
    ),
    [],
  );

  const renderPopularItem = useCallback(
    ({ item }: { item: FeaturedCardProps["film"] }) => (
      <FeaturedCard film={item} />
    ),
    [],
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <AnimatedCarousel />
        <ThemedView type="container">
          <View className="flex-1 ">
            <ThemedText type="subtitle">Trending Films</ThemedText>
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
                {memoizedTrending && (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="my-4"
                    data={memoizedTrending}
                    contentContainerStyle={{
                      gap: 26,
                    }}
                    renderItem={renderTrendingItem}
                    windowSize={5}
                    keyExtractor={(item) => item.tmdbId.toString()}
                    ItemSeparatorComponent={() => <View className="w-2" />}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                  />
                )}
              </View>
            )}
          </View>
          <View className="flex-1">
            <ThemedText type="subtitle">Popular Films</ThemedText>
            {popularLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : popularError ? (
              <ThemedText type="subtitle">
                Error:{popularError.message}
              </ThemedText>
            ) : (
              <View>
                {memoizedPopular && (
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="my-4"
                    data={memoizedPopular}
                    contentContainerStyle={{
                      gap: 16,
                    }}
                    renderItem={renderPopularItem}
                    windowSize={5}
                    keyExtractor={(item) => item.tmdbId.toString()}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
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
